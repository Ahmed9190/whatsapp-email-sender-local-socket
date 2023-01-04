import { launch, Page, Browser as PuppeteerBrowser } from "puppeteer";
import { EnvFileHandler } from "../handlers/env-file.handler";
import { envKeys } from "../constants/env.const";

interface IOpenBrowser {
  withSession: boolean;
}

export default class Browser {
  private static browser: PuppeteerBrowser;

  static async open({ withSession }: IOpenBrowser) {
    this.browser = await launch({
      headless: false,
      userDataDir: withSession ? "./cache" : undefined,
      executablePath:
        EnvFileHandler.getEnvValue(envKeys.BROWSER_PATH) ?? undefined,
      timeout: 0,
    });
  }

  async newTab(url: string): Promise<Page> {
    const page = await Browser.browser.newPage();
    await page.goto(url, { waitUntil: "load" });
    return page;
  }

  static async close() {
    await Browser.browser.close();
  }
}
