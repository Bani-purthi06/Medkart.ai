import Fuse from "fuse.js";
import { loadMatchCandidates, MatchCandidate } from "../normalization/fuzzy/load-candidates";

export interface MatchResult {
  medicineId: number | null;
  matchedText: string | null;
  score: number;        // 0-100, higher = better match (converted from Fuse's 0-1 distance)
  method: "fuse_fuzzy";
}

const CONFIDENCE = {
  AUTO_ACCEPT: 90,
  LOW_CONFIDENCE: 70,
};

/**
 * Fuzzy-matches a noisy extracted drug name against known medicines/aliases.
 * Mirrors the RapidFuzz threshold strategy from the plan:
 *   score >= 90        -> auto-accept
 *   70 <= score < 90    -> accepted but flagged low-confidence by the caller
 *   score < 70          -> no match, left for manual review
 */
export async function fuzzyMatchDrugName(extractedName: string): Promise<MatchResult> {
  const candidates = await loadMatchCandidates();

  const fuse = new Fuse<MatchCandidate>(candidates, {
    keys: ["text"],
    includeScore: true,
    threshold: 0.6,       // Fuse's own cutoff — generous, we apply our own stricter scoring after
    ignoreLocation: true,
  });

  const results = fuse.search(extractedName);

  if (results.length === 0) {
    return { medicineId: null, matchedText: null, score: 0, method: "fuse_fuzzy" };
  }

  const best = results[0];
  // Fuse score: 0 = perfect match, 1 = no match at all. Convert to 0-100, higher = better.
  const normalizedScore = Math.round((1 - (best.score ?? 1)) * 100);

  return {
    medicineId: normalizedScore >= CONFIDENCE.LOW_CONFIDENCE ? best.item.medicineId : null,
    matchedText: best.item.text,
    score: normalizedScore,
    method: "fuse_fuzzy",
  };
}

export { CONFIDENCE };
