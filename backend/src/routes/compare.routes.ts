import { Router } from "express";
import { cleanOcrText } from "../modules/ocr/postprocess/clean-text";
import { fuzzyMatchDrugName } from "../modules/normalization/fuzzy/rapidfuzz";
import { computeRankScore } from "../modules/enrichment/ranking/scoring";

const router = Router();

router.post("/search", async (req, res, next) => {
	try {
		const query = String(req.body?.query ?? "").trim();
		if (!query) {
			return res.status(400).json({ error: "query is required" });
		}

		const cleanedQuery = cleanOcrText(query);
		const match = await fuzzyMatchDrugName(cleanedQuery);

		const results = [
			{ platform: "1mg", price: 120, trustScore: 91, anomalyScore: 8 },
			{ platform: "PharmEasy", price: 109, trustScore: 87, anomalyScore: 10 },
		].map((item) => ({
			...item,
			rankScore: computeRankScore({
				price: item.price,
				cheapestPrice: 109,
				trustScore: item.trustScore,
				anomalyScore: item.anomalyScore,
			}),
		}));

		res.json({ query: cleanedQuery, match, results });
	} catch (error) {
		next(error);
	}
});

export default router;
