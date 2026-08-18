export interface Salt {
  id: number;
  saltName: string;
  saltStrength?: string;
  therapeuticClass?: string;
}

export interface Medicine {
  id: number;
  medicineName: string;
  brandName: string;
  saltId?: number | null;
  dosageForm?: string;
  strength?: string;
  manufacturer?: string;
  isRxOnly?: boolean;
}

export interface Substitute {
  id: number;
  medicineId: number;
  substituteMedicineId: number;
  rationale?: string;
  trustScore: number;
}

export interface Platform {
  id: number;
  platformName: string;
  platformSlug: string;
  baseUrl?: string;
  isActive?: boolean;
}

export interface Price {
  id: number;
  medicineId: number;
  platformId: number;
  mrp: number;
  sellingPrice: number;
  packSize?: string;
  currency?: string;
  fetchedAt?: string;
  sourceUrl?: string;
}

export interface User {
  id: number;
  email: string;
  fullName?: string;
}

export interface CompareResult {
  medicine: Medicine;
  prices: Price[];
  cheapestPrice?: Price;
  cacheHit: boolean;
}
