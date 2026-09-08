import { Link } from "react-router-dom";
import type { AlertEvent } from "@/types";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/format";

export function AlertsFeed({ alerts }: { alerts: AlertEvent[] }) {
  return (
    <div className="grid gap-3">
      {alerts.map((alert) => (
        <Link key={alert.id} to={`/medicine/${alert.medicine.id}`} className="focus-ring rounded-lg">
          <Card className={`p-4 hover:-translate-y-1 hover:shadow-soft ${alert.read ? "" : "border-l-4 border-l-mint"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-ink dark:text-white">{alert.medicine.medicineName}</h3>
                <p className="text-sm text-slate-500">
                  Triggered at {formatCurrency(alert.triggeredPrice)} via {alert.channel.toUpperCase()}
                </p>
              </div>
              <time className="text-sm text-slate-500">{new Date(alert.sentAt).toLocaleString("en-IN")}</time>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
