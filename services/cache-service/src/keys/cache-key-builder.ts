export function buildCacheKey(medicineName: string, platform: string): string {
  return ['compare', medicineName.trim().toLowerCase(), platform.trim().toLowerCase()].join(':');
}
