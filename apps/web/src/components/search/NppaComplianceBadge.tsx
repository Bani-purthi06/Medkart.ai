import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/utils/format";

export function NppaComplianceBadge({ ceiling, price }: { ceiling?: number; price?: number }) {
  if (!ceiling) return null;
  const over = price ? price > ceiling * 10 : false;
  return (
    <Badge className={over ? "bg-coral/10 text-coral" : "bg-mint/10 text-mint"}>
      {over ? <ShieldAlert className="mr-1 size-3" /> : <ShieldCheck className="mr-1 size-3" />}
      NPPA ceiling {formatCurrency(ceiling)}/unit
    </Badge>
  );
}
