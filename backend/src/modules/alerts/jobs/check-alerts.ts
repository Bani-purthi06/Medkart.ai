export interface AlertItem {
  prescriptionId: number;
  reason: string;
}

export async function checkAlerts(): Promise<AlertItem[]> {
  return [];
}