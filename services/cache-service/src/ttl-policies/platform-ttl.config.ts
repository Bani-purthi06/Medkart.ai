export const PLATFORM_CACHE_TTL_SECONDS = 5 * 60 * 60;

export function cacheTtlForPlatform(_platform: string): number {
  return PLATFORM_CACHE_TTL_SECONDS;
}
