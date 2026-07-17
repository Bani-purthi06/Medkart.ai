import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis client error:", err));

let connected = false;
export async function connectRedis() {
  if (!connected) {
    await redisClient.connect();
    connected = true;
  }
}

export async function getCached(key: string): Promise<string | null> {
  await connectRedis();
  return redisClient.get(key);
}

export async function setCached(key: string, value: string, ttlSeconds = 3600): Promise<void> {
  await connectRedis();
  await redisClient.set(key, value, { EX: ttlSeconds });
}
