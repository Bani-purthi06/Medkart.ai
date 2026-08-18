import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";

import authRoutes from "./routes/auth.routes";
import compareRoutes from "./routes/compare.routes";
import interactionsRoutes from "./routes/interactions.routes";
import prescriptionRoutes from "./routes/prescription.routes";
import watchlistRoutes from "./routes/watchlist.routes";
import { requestLogger } from "./middleware/logger";

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(requestLogger);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/auth", authRoutes);
app.use("/compare", compareRoutes);
app.use("/interactions", interactionsRoutes);
app.use("/prescriptions", prescriptionRoutes);
app.use("/watchlist", watchlistRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : "Internal server error";
  console.error(message);
  res.status(500).json({ error: message });
});

const PORT = Number(process.env.PORT ?? 4000);
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));