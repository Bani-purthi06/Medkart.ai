export function trustScore(matches: Array<{ confidence: number }>): number {
  if (matches.length === 0) {
    return 0;
  }

  const average = matches.reduce((sum, item) => sum + item.confidence, 0) / matches.length;
  return Math.round(average * 100);
}