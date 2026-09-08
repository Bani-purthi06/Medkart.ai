import { useQuery } from "@tanstack/react-query";
import { getAlerts } from "@/api/watchlist";
import { PageContainer } from "@/components/layout/PageContainer";
import { AlertsFeed } from "@/components/watchlist/AlertsFeed";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function AlertsPage() {
  const { data = [], isLoading } = useQuery({ queryKey: ["alerts"], queryFn: getAlerts });
  return (
    <PageContainer narrow>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Stay informed</p><h1 className="mt-2 text-3xl font-black text-ink">Alerts</h1></div>
        <div className="flex gap-2">
          <select className="focus-ring rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm"><option>All channels</option><option>Push</option><option>Email</option><option>SMS</option></select>
          <input className="focus-ring rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm" type="date" aria-label="Filter alerts by date" />
        </div>
      </div>
      {isLoading ? <Skeleton className="h-72" /> : data.length ? <AlertsFeed alerts={data} /> : <Card className="p-8 text-center text-slate-500">No alerts yet. Add medicines to your watchlist with a target price to get notified.</Card>}
    </PageContainer>
  );
}
