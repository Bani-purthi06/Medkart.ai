import express, { type NextFunction, type Request, type Response } from 'express';

import { loadEnv } from '@medcompare/shared-config';
import { logger } from '@medcompare/shared-utils';
import { corsMiddleware } from './middleware/cors.middleware';
import { compareRoutes } from './routes/compare.routes';

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(corsMiddleware());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'api-gateway' });
  });

  app.use(compareRoutes);

  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    logger.error('api gateway error', { error: error instanceof Error ? error.message : String(error) });
    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
}

export async function startServer() {
  const app = createApp();
  const { port } = loadEnv();

  app.listen(port, () => {
    logger.info(`api-gateway listening on port ${port}`);
  });
}

if (require.main === module) {
  void startServer();
}
