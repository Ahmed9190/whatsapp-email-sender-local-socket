import { FileChooser, Page } from "puppeteer";
import Browser from "../../core/browser/browser";
import { delay } from "../../core/utils/time.utils";

export default class WhatsappPageHandler {
  async click({
    page,
    selector,
    delayDuration = 1000,
  }: {
    page: Page;
    selector: string;
    delayDuration?: number;
  }): Promise<void> {
    await page.waitForSelector(selector);
    await delay(delayDuration);
    await page.click(selector);
    await delay(delayDuration);
  }

  async pickFile({
    page,
    inputFileSelector,
  }: {
    page: Page;
    inputFileSelector: string;
  }): Promise<FileChooser> {
    await page.waitForSelector(inputFileSelector);
    const [documentChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click(inputFileSelector),
    ]);
    return documentChooser;
  }

  async send({
    page,
    delayDuration = 2000,
  }: {
    delayDuration?: number;
    page: Page;
  }): Promise<void> {
    await page.keyboard.press("Enter");
    await delay(delayDuration);
  }

  async openChat(phoneNumber: string): Promise<Page> {
    const browser: Browser = new Browser();
    const url: string = this.urlBuilder(phoneNumber);

    const page = await browser.newTab(url);
    return page;
  }

  async openWhatsapp() {
    const browser: Browser = new Browser();

    const page = await browser.newTab(this.whatsappUrl);
    return page;
  }

  private whatsappUrl: string = "https://web.whatsapp.com";

  private urlBuilder: (phoneNumber: string) => string = (phone: string) =>
    `${this.whatsappUrl}/send?phone=${phone}`;
}
