import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format";

export function PriceTag({ price, deltaPct }: { price: number; deltaPct?: number }) {
  const down = (deltaPct ?? 0) <= 0;
  return (
    <span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-sm font-bold dark:bg-slate-800">
      {formatCurrency(price)}
      {deltaPct !== undefined && (
        <span className={cn("inline-flex items-center text-xs", down ? "text-mint" : "text-coral")}>
          {down ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}
          {Math.abs(deltaPct)}%
        </span>
      )}
    </span>
  );
}
