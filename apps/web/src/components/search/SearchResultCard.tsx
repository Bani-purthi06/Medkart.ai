import { Link } from "react-router-dom";
import type { Medicine } from "@/types";
import { Card } from "@/components/ui/Card";
import { NppaComplianceBadge } from "./NppaComplianceBadge";
import { PriceTag } from "./PriceTag";

export function SearchResultCard({ medicine }: { medicine: Medicine }) {
  return (
    <Link to={`/medicine/${medicine.id}`} className="focus-ring block rounded-lg">
      <Card className="h-full p-4 hover:-translate-y-1 hover:shadow-soft active:scale-[0.99]">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold text-ink">{medicine.medicineName}</h3>
            <p className="text-sm text-slate-500">{medicine.brandName} | {medicine.strength}</p>
          </div>
          <PriceTag price={medicine.lowestPrice} />
        </div>
        <div className="mb-4 h-10">
          <svg viewBox="0 0 120 36" className="h-full w-full" aria-hidden="true">
            <polyline
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              points={medicine.trend7d
                .map((value, index) => `${index * 20},${34 - ((value - Math.min(...medicine.trend7d)) / 12) * 26}`)
                .join(" ")}
            />
          </svg>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-orange-50 px-2 py-1 text-xs text-orange-700">
            {medicine.dosageForm}
          </span>
          <NppaComplianceBadge ceiling={medicine.nppaCeiling} price={medicine.lowestPrice} />
        </div>
      </Card>
    </Link>
  );
}
