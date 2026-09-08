import type { Substitute } from "@/types";
import { Card } from "@/components/ui/Card";

export function GenericSubstituteCard({ substitute }: { substitute: Substitute }) {
  return (
    <Card className="p-4 hover:-translate-y-1 hover:shadow-soft">
      <h3 className="font-bold text-ink dark:text-white">{substitute.medicine.medicineName}</h3>
      <p className="text-sm text-slate-500">{substitute.medicine.manufacturer}</p>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="block text-slate-500">Trust score</span>
          <strong className="text-mint">{substitute.trustScore}%</strong>
        </div>
        <div>
          <span className="block text-slate-500">Salt match</span>
          <strong>{substitute.saltMatchPct}%</strong>
        </div>
      </div>
    </Card>
  );
}
