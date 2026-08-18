declare module "puppeteer" {
  export interface Page {
    setUserAgent(userAgent: string): Promise<void>;
    goto(url: string, options?: { waitUntil?: string; timeout?: number }): Promise<void>;
    reload(options?: { waitUntil?: string; timeout?: number }): Promise<void>;
    close(): Promise<void>;
    on(event: string, listener: (...args: unknown[]) => void): void;
    off(event: string, listener: (...args: unknown[]) => void): void;
  }

  export interface Browser {
    newPage(): Promise<Page>;
    close(): Promise<void>;
  }

  const puppeteer: {
    launch(options?: { headless?: boolean; args?: string[] }): Promise<Browser>;
  };

  export default puppeteer;
}