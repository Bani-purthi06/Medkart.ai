import type { Medicine } from '@medcompare/shared-types';

import { dbPool } from '../migrations-client/connection';

function mapMedicine(row: Record<string, unknown>): Medicine {
  return {
    id: Number(row.id),
    medicineName: String(row.medicine_name),
    brandName: String(row.brand_name),
    saltId: row.salt_id === null ? null : Number(row.salt_id),
    dosageForm: row.dosage_form ? String(row.dosage_form) : undefined,
    strength: row.strength ? String(row.strength) : undefined,
    manufacturer: row.manufacturer ? String(row.manufacturer) : undefined,
    isRxOnly: Boolean(row.is_rx_only)
  };
}

export async function getMedicineByName(medicineName: string): Promise<Medicine | null> {
  const result = await dbPool.query('SELECT * FROM medicines WHERE LOWER(medicine_name) = $1 LIMIT 1', [medicineName.toLowerCase()]);

  if (result.rowCount === 0) {
    return null;
  }

  return mapMedicine(result.rows[0]);
}

export async function createMedicine(medicine: Omit<Medicine, 'id'>): Promise<Medicine> {
  const result = await dbPool.query(
    `INSERT INTO medicines (medicine_name, brand_name, salt_id, dosage_form, strength, manufacturer, is_rx_only)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      medicine.medicineName,
      medicine.brandName,
      medicine.saltId ?? null,
      medicine.dosageForm ?? null,
      medicine.strength ?? null,
      medicine.manufacturer ?? null,
      medicine.isRxOnly ?? true
    ]
  );

  return mapMedicine(result.rows[0]);
}
