declare module 'redis' {
  export interface RedisClient {
    isOpen: boolean;
    connect(): Promise<void>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, options?: { EX?: number }): Promise<unknown>;
    on(event: string, handler: (error: unknown) => void): void;
  }

  export function createClient(options?: { url?: string }): RedisClient;
}
