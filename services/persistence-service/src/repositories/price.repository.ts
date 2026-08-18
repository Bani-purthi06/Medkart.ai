import type { Price } from '@medcompare/shared-types';

import { dbPool } from '../migrations-client/connection';

function mapPrice(row: Record<string, unknown>): Price {
  return {
    id: Number(row.id),
    medicineId: Number(row.medicine_id),
    platformId: Number(row.platform_id),
    mrp: Number(row.mrp),
    sellingPrice: Number(row.selling_price),
    packSize: row.pack_size ? String(row.pack_size) : undefined,
    currency: row.currency ? String(row.currency) : undefined,
    fetchedAt: row.fetched_at ? String(row.fetched_at) : undefined,
    sourceUrl: row.source_url ? String(row.source_url) : undefined
  };
}

export async function getPricesByMedicineId(medicineId: number): Promise<Price[]> {
  const result = await dbPool.query('SELECT * FROM prices WHERE medicine_id = $1 ORDER BY fetched_at DESC', [medicineId]);
  return result.rows.map(mapPrice);
}

export async function savePrice(price: Omit<Price, 'id' | 'fetchedAt' | 'currency'>): Promise<Price> {
  const result = await dbPool.query(
    `INSERT INTO prices (medicine_id, platform_id, mrp, selling_price, pack_size, source_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (medicine_id, platform_id, pack_size)
     DO UPDATE SET mrp = EXCLUDED.mrp, selling_price = EXCLUDED.selling_price, source_url = EXCLUDED.source_url, fetched_at = NOW()
     RETURNING *`,
    [price.medicineId, price.platformId, price.mrp, price.sellingPrice, price.packSize ?? null, price.sourceUrl ?? null]
  );

  return mapPrice(result.rows[0]);
}
