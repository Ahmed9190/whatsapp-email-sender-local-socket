import { delay } from "../../core/utils/time.utils";
import WhatsappHandler from "./whatsapp-handler";
import Selector from "./whatsapp-selector";

export default class Whatsapp {
  private whatsappHandler: WhatsappHandler = new WhatsappHandler();

  async sendFile(phoneNumber: string, filePath: string): Promise<void> {
    const page = await this.whatsappHandler.openChat(phoneNumber);

    this.whatsappHandler.click({
      page,
      selector: Selector.attachButton,
      delayDuration: 2000,
    });

    this.whatsappHandler.click({ page, selector: Selector.attachButton });

    const documentChooser = await this.whatsappHandler.pickFile({
      page,
      inputFileSelector: Selector.uploadDocumentButton,
    });

    documentChooser.accept([filePath]);
    await delay(2000);

    await this.whatsappHandler.send({ page, delayDuration: 10000 });

    await page.close();
  }

  async sendMessage(phoneNumber: string, message: string): Promise<void> {
    const page = await this.whatsappHandler.openChat(phoneNumber);

    await this.whatsappHandler.click({
      page,
      selector: Selector.messageInput,
    });

    await page.keyboard.type(message, { delay: 50 });

    await this.whatsappHandler.send({ page });

    await page.close();
  }
}
