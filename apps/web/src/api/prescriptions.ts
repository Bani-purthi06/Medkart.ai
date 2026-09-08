import { prescription } from "@/lib/mockData";

const wait = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export async function uploadPrescription() {
  await wait();
  return { id: prescription.id };
}

export async function getPrescription(id: number) {
  await wait();
  return { ...prescription, id };
}
