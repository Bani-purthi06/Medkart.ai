import { Router } from "express";

const router = Router();

router.post("/login", (_req, res) => {
	res.json({ token: "demo-token", user: { id: 1, role: "patient" } });
});

router.get("/me", (_req, res) => {
	res.json({ id: 1, name: "Demo User", role: "patient" });
});

export default router;
