import axios from "axios";
import * as cheerio from "cheerio";
import { isPathAllowed } from "../robots-check";

export interface FetchOptions {
  headers?: Record<string, string>;
  timeoutMs?: number;
}

/**
 * Fetches a page and returns a parsed Cheerio document, but only
 * after confirming robots.txt allows it. Throws if disallowed —
 * callers should catch and fall back to cache/skip, not force through.
 */
export async function fetchAndParse(
  url: string,
  options: FetchOptions = {}
): Promise<cheerio.CheerioAPI> {
  const parsed = new URL(url);
  const allowed = await isPathAllowed(url, parsed.pathname);

  if (!allowed) {
    throw new Error(`Scraping disallowed by robots.txt: ${url}`);
  }

  const { data } = await axios.get(url, {
    timeout: options.timeoutMs ?? 10000,
    headers: {
      "User-Agent":
        options.headers?.["User-Agent"] ??
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      ...options.headers,
    },
  });

  return cheerio.load(data);
}
