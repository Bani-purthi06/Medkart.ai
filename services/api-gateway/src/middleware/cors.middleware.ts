import cors from 'cors';

import { loadEnv } from '@medcompare/shared-config';

export function corsMiddleware() {
  const { corsOrigin } = loadEnv();
  return cors({ origin: corsOrigin, credentials: true });
}
