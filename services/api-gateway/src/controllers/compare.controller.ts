import type { NextFunction, Request, Response } from 'express';

import { loadEnv } from '@medcompare/shared-config';
import { logger } from '@medcompare/shared-utils';
import { buildCacheKey, cacheTtlForPlatform, redisClient } from '@medcompare/cache-service';
import { getMedicineByName, getPricesByMedicineId, savePrice } from '@medcompare/persistence-service';

function getCheapestPrice<T extends { sellingPrice: number }>(prices: T[]): T | undefined {
  return prices.reduce<T | undefined>((cheapest, current) => {
    if (!cheapest || current.sellingPrice < cheapest.sellingPrice) {
      return current;
    }

    return cheapest;
  }, undefined);
}

export async function compareMedicineController(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { medicineName } = req.params;
    const normalizedMedicineName = medicineName.trim().toLowerCase();
    const cacheKey = buildCacheKey(normalizedMedicineName, 'all');

    if (!redisClient.isOpen) {
      await redisClient.connect().catch(() => undefined);
    }
    const cachedValue = await redisClient.get(cacheKey);

    if (cachedValue) {
      res.json({
        source: 'cache',
        data: JSON.parse(cachedValue)
      });
      return;
    }

    const medicine = await getMedicineByName(normalizedMedicineName);

    if (!medicine) {
      res.status(404).json({
        message: `Medicine not found for ${medicineName}`
      });
      return;
    }

    const prices = await getPricesByMedicineId(medicine.id);
    const cheapestPrice = getCheapestPrice(prices);
    const responsePayload = {
      medicine,
      prices,
      cheapestPrice,
      cacheHit: false
    };

    if (prices.length > 0) {
      const ttlSeconds = cacheTtlForPlatform('default');
      await redisClient.set(cacheKey, JSON.stringify(responsePayload), { EX: ttlSeconds });

      const latestPrice = prices[0];
      await savePrice({
        medicineId: medicine.id,
        platformId: latestPrice.platformId,
        mrp: latestPrice.mrp,
        sellingPrice: latestPrice.sellingPrice,
        packSize: latestPrice.packSize,
        sourceUrl: latestPrice.sourceUrl
      });
    }

    logger.info('compare request resolved', { medicineName, port: loadEnv().port });
    res.json({
      source: 'database',
      data: responsePayload
    });
  } catch (error) {
    next(error);
  }
}
