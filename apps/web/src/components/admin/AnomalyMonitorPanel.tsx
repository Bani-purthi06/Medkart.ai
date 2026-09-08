import { useState } from "react";
import { Card } from "@/components/ui/Card";

export function AnomalyMonitorPanel({ anomalies }: { anomalies: { id: number; medicine: string; platform: string; score: number; shapExplanation: string }[] }) {
  const [open, setOpen] = useState<number | null>(anomalies[0]?.id ?? null);
  if (!anomalies.length) {
    return <Card className="p-5 text-sm text-slate-500">No anomalies detected in the last 24 hours.</Card>;
  }
  return (
    <div className="grid gap-3">
      {anomalies.map((anomaly) => (
        <Card key={anomaly.id} className="p-4">
          <button className="focus-ring flex w-full items-center justify-between rounded text-left" onClick={() => setOpen(open === anomaly.id ? null : anomaly.id)}>
            <span className="font-bold text-ink dark:text-white">{anomaly.medicine} on {anomaly.platform}</span>
            <span className="text-sm font-bold text-coral">{Math.round(anomaly.score * 100)} score</span>
          </button>
          {open === anomaly.id && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{anomaly.shapExplanation}</p>}
        </Card>
      ))}
    </div>
  );
}
