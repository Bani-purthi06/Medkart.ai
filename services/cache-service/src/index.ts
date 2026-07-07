import { createClient } from 'redis';

import { loadEnv } from '@medcompare/shared-config';

const { redisUrl } = loadEnv();

export const redisClient = createClient({ url: redisUrl });

redisClient.on('error', (error) => {
  console.error('[ERROR] redis client error', error);
});

export { buildCacheKey } from './keys/cache-key-builder';
export { cacheTtlForPlatform, PLATFORM_CACHE_TTL_SECONDS } from './ttl-policies/platform-ttl.config';
