import { alerts, watchlist } from "@/lib/mockData";

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getWatchlist() {
  await wait();
  return watchlist;
}

export async function getAlerts() {
  await wait();
  return alerts;
}
