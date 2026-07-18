export interface AppConfig {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  redisUrl: string;
  corsOrigin: string;
}

export function loadEnv(): AppConfig {
  return {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000),
    databaseUrl: process.env.DATABASE_URL ?? 'postgresql://medcompare:medcompare@localhost:5432/medcompare',
    redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000'
  };
}

export const DEFAULT_CACHE_TTL_SECONDS = 5 * 60 * 60;
