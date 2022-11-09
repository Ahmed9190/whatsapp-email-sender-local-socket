import Browser from "../../core/browser/browser";
import { Base64File } from "../../core/interfaces/base64-file";
import { TmpStorage } from "../../core/storage/tmp-storage";
import { WhatsappSendFileDto } from "./dto/whatsapp-send-file.dto";
import { WhatsappSendMessageDto } from "./dto/whatsapp-send-message.dto";
import Whatsapp from "./whatsapp";
import WhatsappHandler from "./whatsapp-handler";

export class WhatsappFacade {
  async open(): Promise<void> {
    await Browser.open({ withSession: true });

    const whatsappHandler = new WhatsappHandler();

    const page = await whatsappHandler.openWhatsapp();

    await page.waitForNavigation({ timeout: 0 });
  }

  async sendMessage(data: WhatsappSendMessageDto): Promise<void> {
    await Browser.open({ withSession: true });

    const { number, message } = data;
    const whatsapp: Whatsapp = new Whatsapp();

    await whatsapp.sendMessage(number, message);

    await Browser.close();
  }

  async sendFile(data: WhatsappSendFileDto): Promise<void> {
    await Browser.open({ withSession: true });

    const { number, base64, fileName } = data;
    const whatsapp: Whatsapp = new Whatsapp();

    const base64File: Base64File = {
      base64,
      fileName,
    };

    await TmpStorage.saveUseRemove({
      base64File,
      use: (path: string) => whatsapp.sendFile(number, path),
    });

    await Browser.close();
  }
}
