import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import type { DrugInteraction } from "@/types";
import { Card } from "@/components/ui/Card";

export function DrugInteractionWarningBanner({ interactions }: { interactions: DrugInteraction[] }) {
  const [open, setOpen] = useState(true);
  if (!interactions.length) return null;
  return (
    <Card className="border-coral/30 bg-coral/5 p-4">
      <button className="focus-ring flex w-full items-center justify-between rounded text-left" onClick={() => setOpen(!open)}>
        <span className="flex items-center gap-2 font-bold text-coral">
          <AlertTriangle className="size-5" />
          Drug interaction warning
        </span>
        <span className="text-sm text-slate-500">{open ? "Hide" : "Show"}</span>
      </button>
      {open && (
        <div className="mt-3 grid gap-2">
          {interactions.map((item) => (
            <p key={item.id} className="text-sm text-slate-700 dark:text-slate-200">
              <strong>{item.medicineA}</strong> + <strong>{item.medicineB}</strong> ({item.severity}): {item.summary}
            </p>
          ))}
        </div>
      )}
    </Card>
  );
}
