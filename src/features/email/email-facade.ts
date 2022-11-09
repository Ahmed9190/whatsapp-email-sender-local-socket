import { envKeys } from "../../core/constants/env.const";
import { EncryptionHandler } from "../../core/handlers/encryption.handler";
import { EnvFileHandler } from "../../core/handlers/env-file.handler";
import { EmailSendDto } from "./dto/email-send.dto";
import { EmailUpdateDto } from "./dto/email-update.dto";
import { Email } from "./email";
import { EmailService, TransporterOptions } from "./transporter-options";
import { TmpStorage } from "../../core/storage/tmp-storage";
import { Base64File } from "../../core/interfaces/base64-file";

export class EmailFacade {
  update(data: EmailUpdateDto) {
    const { service, email, password } = data;

    const emailServiceLowerCase: EmailService =
      service.toLocaleLowerCase() as EmailService;

    EnvFileHandler.setEnvValue(envKeys.EMAIL_SERVICE, emailServiceLowerCase);
    EnvFileHandler.setEnvValue(envKeys.EMAIL, email);

    const encryptionHandler = new EncryptionHandler();
    const encryptedPassword = encryptionHandler.encrypt(password);

    EnvFileHandler.setEnvValue(envKeys.PASSWORD, encryptedPassword);
  }

  async send(data: EmailSendDto) {
    const { to, base64, fileName, text, subject } = data;

    const service = EnvFileHandler.getEnvValue(
      envKeys.EMAIL_SERVICE
    ) as EmailService;

    const email = EnvFileHandler.getEnvValue(envKeys.EMAIL);
    const encryptedPassword = EnvFileHandler.getEnvValue(envKeys.PASSWORD);

    if (service == null) throw Error("Can't retrieve EMAIL_SERVICE from .env");
    if (email == null) throw Error("Can't retrieve EMAIL from .env");
    if (encryptedPassword == null)
      throw Error("Can't retrieve PASSWORD from .env");

    const encryptor: EncryptionHandler = new EncryptionHandler();

    const decryptedPassword: string = encryptor.decrypt(encryptedPassword!);

    const transporterOptions = TransporterOptions[service](
      email,
      decryptedPassword
    );

    const mailer: Email = new Email(transporterOptions);

    const base64File: Base64File = {
      base64,
      fileName,
    };

    TmpStorage.saveUseRemove({
      base64File,
      use: (path: string) =>
        mailer.sendAttachment({
          to,
          subject,
          text,
          attachments: [{ path: path }],
        }),
    });
  }
}
