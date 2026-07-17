import { NextFunction, Request, Response } from "express";

export function requestLogger(req: Request, _res: Response, next: NextFunction) {
	const startedAt = Date.now();

	req.res?.on("finish", () => {
		const elapsedMs = Date.now() - startedAt;
		console.log(`${req.method} ${req.originalUrl} ${req.res?.statusCode} ${elapsedMs}ms`);
	});

	next();
}
