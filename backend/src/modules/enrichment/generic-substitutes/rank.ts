export interface SubstituteCandidate {
  medicineId: number;
  medicineName: string;
  saltName: string;
  trustScore: number;
  estimatedSavingsPercent: number;
}

export function rankSubstitutes(candidates: SubstituteCandidate[]): SubstituteCandidate[] {
  return [...candidates].sort((left, right) => {
    const scoreDelta = right.trustScore - left.trustScore;
    if (scoreDelta !== 0) {
      return scoreDelta;
    }

    return right.estimatedSavingsPercent - left.estimatedSavingsPercent;
  });
}