import { Router } from "express";
import { lookupInteractions } from "../modules/enrichment/interactions/lookup";
import { summarizeInteraction } from "../modules/enrichment/interactions/guardrails";
import { rewriteInteractionSummary } from "../modules/enrichment/interactions/llm-rewrite";

const router = Router();

router.post("/check", (req, res) => {
	const medicines = Array.isArray(req.body?.medicines) ? req.body.medicines : [];
	const results = lookupInteractions(medicines).map((item) => ({
		...item,
		summary: rewriteInteractionSummary(summarizeInteraction(item)),
	}));

	res.json({ results });
});

export default router;
