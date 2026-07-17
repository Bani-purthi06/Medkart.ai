export interface PriceRankInput {
	price: number;
	cheapestPrice: number;
	trustScore: number;
	anomalyScore?: number;
}

export function computeRankScore(input: PriceRankInput): number {
	const pricePenalty = input.cheapestPrice > 0 ? Math.max(0, (input.price - input.cheapestPrice) / input.cheapestPrice) : 0;
	const anomalyPenalty = (input.anomalyScore ?? 0) / 100;
	return Math.max(0, Math.round(input.trustScore - pricePenalty * 30 - anomalyPenalty * 20));
}
