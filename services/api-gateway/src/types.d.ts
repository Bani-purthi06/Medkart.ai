declare module 'express' {
  export interface Request {
    params: Record<string, string>;
  }

  export interface Response {
    json(body: unknown): void;
    status(code: number): Response;
  }

  export type NextFunction = (error?: unknown) => void;

  export interface Router {
    get(path: string, handler: unknown): void;
  }

  export interface Express {
    use(handler: unknown): void;
    get(path: string, handler: unknown): void;
    listen(port: number, callback?: () => void): void;
  }

  export default function express(): Express;
  export function Router(): Router;
}

declare module 'cors' {
  type CorsOptions = {
    origin?: string | string[] | boolean;
    credentials?: boolean;
  };

  export default function cors(options?: CorsOptions): unknown;
}
