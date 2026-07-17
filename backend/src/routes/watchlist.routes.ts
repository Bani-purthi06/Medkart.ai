import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
	res.json({ items: [] });
});

router.post("/", (req, res) => {
	const { medicineName } = req.body as { medicineName?: string };
	if (!medicineName) {
		return res.status(400).json({ error: "medicineName is required" });
	}

	res.status(201).json({ id: Date.now(), medicineName });
});

export default router;
