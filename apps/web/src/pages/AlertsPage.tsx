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
        <h1 className="text-3xl font-black text-ink dark:text-white">Alerts</h1>
        <div className="flex gap-2">
          <select className="focus-ring rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"><option>All channels</option><option>Push</option><option>Email</option><option>SMS</option></select>
          <input className="focus-ring rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" type="date" aria-label="Filter alerts by date" />
        </div>
      </div>
      {isLoading ? <Skeleton className="h-72" /> : data.length ? <AlertsFeed alerts={data} /> : <Card className="p-8 text-center text-slate-500">No alerts yet. Add medicines to your watchlist with a target price to get notified.</Card>}
    </PageContainer>
  );
}
