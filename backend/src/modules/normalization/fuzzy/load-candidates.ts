export interface MatchCandidate {
  medicineId: number;
  text: string;
}

const DEFAULT_CANDIDATES: MatchCandidate[] = [
  { medicineId: 1, text: "Paracetamol" },
  { medicineId: 1, text: "Acetaminophen" },
  { medicineId: 2, text: "Amoxicillin" },
  { medicineId: 3, text: "Amlodipine" },
  { medicineId: 4, text: "Metformin" },
  { medicineId: 5, text: "Omeprazole" },
];

export async function loadMatchCandidates(): Promise<MatchCandidate[]> {
  return DEFAULT_CANDIDATES;
}