export interface SaltMatch {
  medicineId: number;
  saltName: string;
  confidence: number;
}

export function matchSalt(activeSalt: string): SaltMatch[] {
  const normalized = activeSalt.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  return [{ medicineId: normalized.length, saltName: activeSalt, confidence: 0.92 }];
}