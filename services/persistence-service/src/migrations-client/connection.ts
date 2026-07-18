import { Pool } from 'pg';

import { loadEnv } from '@medcompare/shared-config';

const { databaseUrl } = loadEnv();

export const dbPool = new Pool({
  connectionString: databaseUrl
});
