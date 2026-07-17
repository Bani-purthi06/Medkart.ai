import puppeteer, { Browser, Page } from "puppeteer";
import { isPathAllowed } from "../robots-check";

let sharedBrowser: Browser | null = null;

/**
 * Launches (or reuses) a single shared headless browser instance.
 * Launching a fresh browser per request is expensive — one shared
 * instance with fresh pages per request is the standard pattern.
 */
async function getBrowser(): Promise<Browser> {
  if (!sharedBrowser) {
    sharedBrowser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return sharedBrowser;
}

export async function closeBrowser(): Promise<void> {
  if (sharedBrowser) {
    await sharedBrowser.close();
    sharedBrowser = null;
  }
}

/**
 * Opens a new page, navigates to the URL (after checking robots.txt),
 * waits for network to settle (JS-rendered content loaded), and hands
 * back the page for the caller to read the DOM from. Caller is
 * responsible for closing the page.
 */
export async function openRenderedPage(url: string, timeoutMs = 15000): Promise<Page> {
  const parsed = new URL(url);
  const allowed = await isPathAllowed(url, parsed.pathname);
  if (!allowed) {
    throw new Error(`Scraping disallowed by robots.txt: ${url}`);
  }

  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0"
  );

  await page.goto(url, { waitUntil: "networkidle2", timeout: timeoutMs });

  return page;
}
