import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { envKeys } from "../../core/constants/env.const";
import { EnvFileHandler } from "../../core/handlers/env-file.handler";
import { TmpStorage } from "../../core/storage/tmp-storage";

export class Email {
  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(transportOptions: SMTPTransport.Options) {
    this.transporter = nodemailer.createTransport(transportOptions);
  }

  async sendAttachment(mailOptions: Mail.Options) {
    const email = EnvFileHandler.getEnvValue(envKeys.EMAIL);

    if (email == null) throw Error("Can't retrieve EMAIL from .env");

    await this.transporter.sendMail({
      from: email!,
      ...mailOptions,
    });
  }
}
