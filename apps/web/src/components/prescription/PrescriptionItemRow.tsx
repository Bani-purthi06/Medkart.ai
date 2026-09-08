import type { PrescriptionItem } from "@/types";
import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/cn";

export function PrescriptionItemRow({ item }: { item: PrescriptionItem }) {
  const lowConfidence = item.matchScore < 0.75;
  return (
    <div className={cn("grid gap-3 rounded-lg border p-3 md:grid-cols-5", lowConfidence ? "border-amber/50 bg-amber/5" : "border-slate-200 dark:border-slate-800")}>
      <label className="grid gap-1 text-xs font-semibold text-slate-500">
        Drug
        <Input defaultValue={item.drugName} aria-label="Drug name" />
      </label>
      <label className="grid gap-1 text-xs font-semibold text-slate-500">
        Dosage
        <Input defaultValue={item.dosage} aria-label="Dosage" />
      </label>
      <label className="grid gap-1 text-xs font-semibold text-slate-500">
        Frequency
        <Input defaultValue={item.frequency} aria-label="Frequency" />
      </label>
      <label className="grid gap-1 text-xs font-semibold text-slate-500">
        Duration
        <Input defaultValue={item.duration} aria-label="Duration" />
      </label>
      <div className="flex items-end">
        <span className={cn("rounded-full px-2 py-1 text-xs font-bold", lowConfidence ? "bg-amber/20 text-amber" : "bg-mint/10 text-mint")}>
          {Math.round(item.matchScore * 100)}% match
        </span>
      </div>
      {lowConfidence && (
        <select className="focus-ring min-h-10 rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900 md:col-span-5" aria-label="Choose close medicine match">
          <option>{item.matchedMedicine?.medicineName}</option>
          <option>Dolo 650</option>
          <option>Pantocid DSR</option>
        </select>
      )}
    </div>
  );
}
