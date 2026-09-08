export type DosageForm = "Tablet" | "Syrup" | "Injection" | "Capsule" | "Inhaler";

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
  dosageForm: DosageForm;
  strength: string;
  manufacturer: string;
  isRxOnly?: boolean;
  aliases?: string[];
  salts: Salt[];
  nppaCeiling?: number;
  lowestPrice: number;
  trend7d: number[];
}

export interface PlatformPrice {
  id: number;
  medicineId: number;
  platformName: string;
  platformSlug: string;
  mrp: number;
  sellingPrice: number;
  deliveryEta: string;
  inStock: boolean;
  fetchedAt: string;
  sourceUrl: string;
  deltaPct: number;
}

export interface PricePoint {
  date: string;
  [platform: string]: string | number;
}

export interface Substitute {
  id: number;
  medicine: Medicine;
  trustScore: number;
  saltMatchPct: number;
}

export interface DrugInteraction {
  id: number;
  medicineA: string;
  medicineB: string;
  severity: "low" | "moderate" | "high";
  summary: string;
}

export interface PrescriptionItem {
  id: number;
  drugName: string;
  dosage: string;
  frequency: string;
  duration: string;
  matchScore: number;
  matchedMedicine?: Medicine;
}

export interface Prescription {
  id: number;
  imageUrl: string;
  status: "processing" | "partial" | "reviewed";
  items: PrescriptionItem[];
  interactions: DrugInteraction[];
}

export interface WatchlistItem {
  id: number;
  medicine: Medicine;
  currentPrice: number;
  targetPrice: number;
  createdAt: string;
}

export interface AlertEvent {
  id: number;
  medicine: Medicine;
  triggeredPrice: number;
  channel: "push" | "email" | "sms";
  sentAt: string;
  read: boolean;
}
