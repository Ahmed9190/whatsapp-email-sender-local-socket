import Browser from "../../core/browser/browser";
import { TmpStorage } from "../../core/storage/tmp-storage";
import { WhatsappSendFileWithMessageDto } from "./dto/whatsapp-send-file-with-message.dto";
import { WhatsappSendFileDto } from "./dto/whatsapp-send-file.dto";
import { WhatsappSendMessageDto } from "./dto/whatsapp-send-message.dto";
import Whatsapp from "./whatsapp";
import WhatsappPageHandler from "./whatsapp-page-handler";

export class WhatsappFacade {
  private static readonly whatsapp: Whatsapp = new Whatsapp();
  private static readonly whatsappPageHandler: WhatsappPageHandler =
    new WhatsappPageHandler();

  private constructor() {}

  static async open(): Promise<void> {
    await Browser.open({ withSession: true });

    const page = await WhatsappFacade.whatsappPageHandler.openWhatsapp();

    await page.waitForNavigation({ timeout: 0 });
  }

  static async sendMessage(data: WhatsappSendMessageDto): Promise<void> {
    const { number, message } = data;

    await Browser.open({ withSession: true });

    const page = await WhatsappFacade.whatsappPageHandler.openChat(number);
    await WhatsappFacade.whatsapp.sendMessage({ message: message, page: page });

    await Browser.close();
  }

  static async sendFile(data: WhatsappSendFileDto): Promise<void> {
    const { number, base64Files } = data;

    await Browser.open({ withSession: true });

    const page = await WhatsappFacade.whatsappPageHandler.openChat(number);
    await TmpStorage.saveUseRemove({
      base64Files: base64Files,
      use: (filePaths: string[]) =>
        WhatsappFacade.whatsapp.sendFile({ filePaths, page }),
    });

    await Browser.close();
  }

  static async sendFileWithMessage(
    data: WhatsappSendFileWithMessageDto
  ): Promise<void> {
    const { base64Files, number, message } = data;

    await Browser.open({ withSession: true });

    const page = await WhatsappFacade.whatsappPageHandler.openChat(number);
    await WhatsappFacade.whatsapp.sendMessage({ message: message, page: page });
    await TmpStorage.saveUseRemove({
      base64Files: base64Files,
      use: (filePaths: string[]) =>
        WhatsappFacade.whatsapp.sendFile({ filePaths, page }),
    });

    await Browser.close();
  }
}
