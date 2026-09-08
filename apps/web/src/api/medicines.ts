import { medicines, platformPrices, priceHistory, substitutes, interactions } from "@/lib/mockData";

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function searchMedicines(query: string, filters?: { form?: string; inStock?: boolean }) {
  await wait();
  const normalized = query.trim().toLowerCase();
  return medicines.filter((medicine) => {
    const haystack = [
      medicine.medicineName,
      medicine.brandName,
      medicine.strength,
      medicine.dosageForm,
      ...(medicine.aliases ?? []),
      ...medicine.salts.map((salt) => salt.saltName),
    ]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !normalized || haystack.includes(normalized);
    const matchesForm = !filters?.form || filters.form === "all" || medicine.dosageForm === filters.form;
    const hasStock =
      !filters?.inStock ||
      platformPrices.some((price) => price.medicineId === medicine.id && price.inStock);
    return matchesQuery && matchesForm && hasStock;
  });
}

export async function getTrendingMedicines() {
  await wait();
  return medicines.slice(0, 5);
}

export async function getMedicine(id: number) {
  await wait();
  const medicine = medicines.find((item) => item.id === id);
  if (!medicine) throw new Error("Medicine not found");
  return {
    medicine,
    prices: platformPrices.filter((price) => price.medicineId === id || id === 1),
    history: id === 1 ? priceHistory : [],
    substitutes,
    interactions: id === 2 || id === 3 ? interactions : [],
  };
}
