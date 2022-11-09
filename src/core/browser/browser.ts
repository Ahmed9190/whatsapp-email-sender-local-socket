import puppeteer from "puppeteer";

export default class Browser {
  private static browser: puppeteer.Browser;

  static async open({ withSession }: { withSession: boolean }) {
    this.browser = await puppeteer.launch({
      headless: false,
      userDataDir: withSession ? "./cache" : undefined,

      timeout: 0,
    });
  }

  async newTab(url: string): Promise<puppeteer.Page> {
    const page = await Browser.browser.newPage();
    await page.goto(url, { waitUntil: "load" });
    return page;
  }

  static async close() {
    await Browser.browser.close();
  }
}
