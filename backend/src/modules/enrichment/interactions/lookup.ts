export interface InteractionLookupResult {
  medicines: string[];
  riskLevel: "low" | "medium" | "high";
  note: string;
}

const INTERACTIONS: Record<string, InteractionLookupResult> = {
  "ibuprofen:warfarin": {
    medicines: ["Ibuprofen", "Warfarin"],
    riskLevel: "high",
    note: "NSAIDs can increase bleeding risk when combined with warfarin.",
  },
  "contrast:metformin": {
    medicines: ["Contrast media", "Metformin"],
    riskLevel: "medium",
    note: "Metformin may need to be paused around certain contrast procedures.",
  },
};

export function lookupInteractions(medicines: string[]): InteractionLookupResult[] {
  const normalized = medicines.map((item) => item.toLowerCase()).sort();
  const key = normalized.join(":");
  const result = INTERACTIONS[key];
  return result ? [result] : [];
}