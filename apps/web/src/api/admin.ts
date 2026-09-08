import { medicines } from "@/lib/mockData";

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAdminDashboard() {
  await wait();
  return {
    kpis: [
      { label: "Medicines tracked", value: "12,480" },
      { label: "Active users", value: "8,214" },
      { label: "Price checks today", value: "64,032" },
      { label: "Open anomalies", value: "7" },
    ],
    anomalies: [
      {
        id: 1,
        medicine: "Dolo 650",
        platform: "Netmeds",
        score: 0.91,
        shapExplanation: "Selling price moved 18% above the 30-day median while competitors stayed stable.",
      },
      {
        id: 2,
        medicine: "Pantocid DSR",
        platform: "Truemeds",
        score: 0.83,
        shapExplanation: "Discount depth changed sharply after two failed scrape attempts and one stock flip.",
      },
    ],
  };
}

export async function getCatalog() {
  await wait();
  return medicines;
}

export async function getUsers() {
  await wait();
  return [
    { id: 1, fullName: "Aarav Mehta", email: "aarav@example.com", phone: "+91 98765 43210", signupDate: "2026-08-12", watchlistCount: 4, active: true },
    { id: 2, fullName: "Sara Iyer", email: "sara@example.com", phone: "+91 91234 56780", signupDate: "2026-08-22", watchlistCount: 2, active: true },
    { id: 3, fullName: "Rahul Nair", email: "rahul@example.com", phone: "+91 99887 76655", signupDate: "2026-07-19", watchlistCount: 0, active: false },
  ];
}

export async function getScrapers() {
  await wait();
  return [
    { id: 1, platformName: "Tata 1mg", baseUrl: "https://www.1mg.com", scrapeType: "Cheerio", frequency: "Every 30 min", lastSuccess: "10 min ago", nextRun: "20 min", status: "healthy", lastError: "" },
    { id: 2, platformName: "PharmEasy", baseUrl: "https://pharmeasy.in", scrapeType: "Puppeteer", frequency: "Hourly", lastSuccess: "44 min ago", nextRun: "16 min", status: "running", lastError: "" },
    { id: 3, platformName: "Netmeds", baseUrl: "https://www.netmeds.com", scrapeType: "Cheerio", frequency: "Hourly", lastSuccess: "2 hr ago", nextRun: "8 min", status: "warning", lastError: "Selector timeout on product card" },
  ];
}
