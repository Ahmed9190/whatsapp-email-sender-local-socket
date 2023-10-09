import { Page } from "puppeteer";
import { delay } from "../../core/utils/time.utils";
import WhatsappPageHandler from "./whatsapp-page-handler";
import Selector from "./whatsapp-selector";

export default class Whatsapp {
  private whatsappHandler: WhatsappPageHandler = new WhatsappPageHandler();

  async sendFile({
    filePaths,
    page,
  }: {
    filePaths: string[];
    page: Page;
  }): Promise<void> {
    await this.whatsappHandler.click({
      page,
      selector: Selector.attachButton,
    });

    this.whatsappHandler.click({ page, selector: Selector.attachButton });

    const documentChooser = await this.whatsappHandler.pickFile({
      page,
      inputFileSelector: Selector.uploadDocumentButton,
    });

    documentChooser.accept(filePaths);
    await delay(2000);

    await this.whatsappHandler.send({ page, delayDuration: 10000 });
  }

  async sendMessage({
    message,
    page,
  }: {
    message: string;
    page: Page;
  }): Promise<void> {
    await this.whatsappHandler.click({
      page,
      selector: Selector.messageInput,
    });

    await page.keyboard.type(message, { delay: 100 });

    await this.whatsappHandler.send({ page });
  }

  async sendFileWithMessage({
    message,
    filePaths,
    page,
  }: {
    message: string;
    filePaths: string[];
    page: Page;
  }): Promise<void> {
    await this.sendMessage({ message, page });
    await this.sendFile({ filePaths, page });
  }
}
