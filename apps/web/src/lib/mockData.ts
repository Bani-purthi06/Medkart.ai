import type {
  AlertEvent,
  DrugInteraction,
  Medicine,
  PlatformPrice,
  Prescription,
  Substitute,
  WatchlistItem,
} from "@/types";

export const medicines: Medicine[] = [
  {
    id: 1,
    medicineName: "Dolo 650",
    brandName: "Dolo",
    dosageForm: "Tablet",
    strength: "650 mg",
    manufacturer: "Micro Labs",
    aliases: ["paracetamol 650", "dolo"],
    salts: [{ id: 1, saltName: "Paracetamol", saltStrength: "650 mg", therapeuticClass: "Analgesic" }],
    nppaCeiling: 2.3,
    lowestPrice: 28,
    trend7d: [31, 30, 30, 29, 29, 28, 28],
  },
  {
    id: 2,
    medicineName: "Azithral 500",
    brandName: "Azithral",
    dosageForm: "Tablet",
    strength: "500 mg",
    manufacturer: "Alembic",
    aliases: ["azithromycin", "azithro"],
    salts: [{ id: 2, saltName: "Azithromycin", saltStrength: "500 mg", therapeuticClass: "Antibiotic" }],
    lowestPrice: 98,
    trend7d: [112, 108, 106, 104, 102, 99, 98],
  },
  {
    id: 3,
    medicineName: "Pantocid DSR",
    brandName: "Pantocid",
    dosageForm: "Capsule",
    strength: "40 mg + 30 mg",
    manufacturer: "Sun Pharma",
    aliases: ["pantoprazole domperidone", "acidity capsule"],
    salts: [
      { id: 3, saltName: "Pantoprazole", saltStrength: "40 mg", therapeuticClass: "PPI" },
      { id: 4, saltName: "Domperidone", saltStrength: "30 mg", therapeuticClass: "Prokinetic" },
    ],
    nppaCeiling: 13.7,
    lowestPrice: 132,
    trend7d: [150, 148, 143, 140, 138, 135, 132],
  },
  {
    id: 4,
    medicineName: "Telma 40",
    brandName: "Telma",
    dosageForm: "Tablet",
    strength: "40 mg",
    manufacturer: "Glenmark",
    aliases: ["telmisartan", "bp tablet"],
    salts: [{ id: 5, saltName: "Telmisartan", saltStrength: "40 mg", therapeuticClass: "ARB" }],
    lowestPrice: 115,
    trend7d: [121, 121, 119, 118, 116, 116, 115],
  },
  {
    id: 5,
    medicineName: "Augmentin 625 Duo",
    brandName: "Augmentin",
    dosageForm: "Tablet",
    strength: "625 mg",
    manufacturer: "GSK",
    aliases: ["amoxyclav", "amoxicillin clavulanate"],
    salts: [
      { id: 6, saltName: "Amoxicillin", saltStrength: "500 mg", therapeuticClass: "Antibiotic" },
      { id: 7, saltName: "Clavulanic Acid", saltStrength: "125 mg", therapeuticClass: "Beta-lactamase inhibitor" },
    ],
    lowestPrice: 178,
    trend7d: [186, 184, 184, 181, 180, 179, 178],
  },
];

export const platformPrices: PlatformPrice[] = [
  { id: 1, medicineId: 1, platformName: "Tata 1mg", platformSlug: "1mg", mrp: 34, sellingPrice: 28, deliveryEta: "Today", inStock: true, fetchedAt: "2026-09-05", sourceUrl: "#", deltaPct: -8 },
  { id: 2, medicineId: 1, platformName: "PharmEasy", platformSlug: "pharmeasy", mrp: 34, sellingPrice: 30, deliveryEta: "Tomorrow", inStock: true, fetchedAt: "2026-09-05", sourceUrl: "#", deltaPct: -2 },
  { id: 3, medicineId: 1, platformName: "Netmeds", platformSlug: "netmeds", mrp: 34, sellingPrice: 33, deliveryEta: "2 days", inStock: false, fetchedAt: "2026-09-05", sourceUrl: "#", deltaPct: 4 },
  { id: 4, medicineId: 2, platformName: "Apollo 24|7", platformSlug: "apollo", mrp: 120, sellingPrice: 98, deliveryEta: "Today", inStock: true, fetchedAt: "2026-09-05", sourceUrl: "#", deltaPct: -12 },
  { id: 5, medicineId: 2, platformName: "Tata 1mg", platformSlug: "1mg", mrp: 120, sellingPrice: 104, deliveryEta: "Tomorrow", inStock: true, fetchedAt: "2026-09-05", sourceUrl: "#", deltaPct: -4 },
  { id: 6, medicineId: 3, platformName: "Truemeds", platformSlug: "truemeds", mrp: 168, sellingPrice: 132, deliveryEta: "Today", inStock: true, fetchedAt: "2026-09-05", sourceUrl: "#", deltaPct: -7 },
  { id: 7, medicineId: 4, platformName: "PharmEasy", platformSlug: "pharmeasy", mrp: 140, sellingPrice: 115, deliveryEta: "Today", inStock: true, fetchedAt: "2026-09-05", sourceUrl: "#", deltaPct: -3 },
  { id: 8, medicineId: 5, platformName: "Netmeds", platformSlug: "netmeds", mrp: 213, sellingPrice: 178, deliveryEta: "Tomorrow", inStock: true, fetchedAt: "2026-09-05", sourceUrl: "#", deltaPct: -5 },
];

export const priceHistory = [
  { date: "Aug 08", "Tata 1mg": 36, "PharmEasy": 35, Netmeds: 34 },
  { date: "Aug 15", "Tata 1mg": 34, "PharmEasy": 33, Netmeds: 35 },
  { date: "Aug 22", "Tata 1mg": 31, "PharmEasy": 32, Netmeds: 34 },
  { date: "Aug 29", "Tata 1mg": 30, "PharmEasy": 31, Netmeds: 33 },
  { date: "Sep 05", "Tata 1mg": 28, "PharmEasy": 30, Netmeds: 33 },
];

export const substitutes: Substitute[] = medicines.slice(1, 4).map((medicine, index) => ({
  id: index + 1,
  medicine,
  trustScore: [94, 88, 84][index],
  saltMatchPct: [100, 96, 92][index],
}));

export const interactions: DrugInteraction[] = [
  {
    id: 1,
    medicineA: "Azithral 500",
    medicineB: "Pantocid DSR",
    severity: "moderate",
    summary: "May increase gastric side-effect risk for sensitive patients. Confirm timing and need with a clinician.",
  },
];

export const prescription: Prescription = {
  id: 101,
  imageUrl:
    "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80",
  status: "partial",
  items: [
    { id: 1, drugName: "Dolo 650", dosage: "1 tab", frequency: "SOS", duration: "3 days", matchScore: 0.96, matchedMedicine: medicines[0] },
    { id: 2, drugName: "Azithral 500", dosage: "1 tab", frequency: "OD", duration: "3 days", matchScore: 0.91, matchedMedicine: medicines[1] },
    { id: 3, drugName: "Pantocid DSR", dosage: "1 cap", frequency: "Morning", duration: "5 days", matchScore: 0.64, matchedMedicine: medicines[2] },
  ],
  interactions,
};

export const watchlist: WatchlistItem[] = [
  { id: 1, medicine: medicines[0], currentPrice: 28, targetPrice: 30, createdAt: "2026-08-28" },
  { id: 2, medicine: medicines[3], currentPrice: 115, targetPrice: 105, createdAt: "2026-08-31" },
];

export const alerts: AlertEvent[] = [
  { id: 1, medicine: medicines[0], triggeredPrice: 28, channel: "push", sentAt: "2026-09-05T10:10:00Z", read: false },
  { id: 2, medicine: medicines[3], triggeredPrice: 115, channel: "email", sentAt: "2026-09-03T08:30:00Z", read: true },
];
