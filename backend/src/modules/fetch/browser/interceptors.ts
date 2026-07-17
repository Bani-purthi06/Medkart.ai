import { Page } from "puppeteer";

export interface InterceptedResponse {
  url: string;
  json: any;
}

/**
 * Many JS-heavy pharmacy sites fetch prices via an internal JSON API
 * call after the page loads, rather than rendering everything server-side.
 * Instead of waiting for the DOM to settle and scraping rendered HTML
 * (slower, fragile to markup changes), this listens for network
 * responses matching a URL pattern and captures the JSON directly —
 * usually faster and more stable across site redesigns.
 *
 * Usage: call this BEFORE page.goto(), so listeners are attached
 * before navigation triggers the relevant requests.
 */
export function captureJsonResponses(
  page: Page,
  urlPattern: RegExp
): { results: InterceptedResponse[]; stop: () => void } {
  const results: InterceptedResponse[] = [];

  const listener = async (response: any) => {
    const url = response.url();
    if (urlPattern.test(url) && response.request().resourceType() === "xhr") {
      try {
        const json = await response.json();
        results.push({ url, json });
      } catch {
        // response wasn't valid JSON — ignore, not every xhr match is relevant
      }
    }
  };

  page.on("response", listener);

  return {
    results,
    stop: () => page.off("response", listener),
  };
}
