import { Link } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchlist";
import { PageContainer } from "@/components/layout/PageContainer";
import { WatchlistTable } from "@/components/watchlist/WatchlistTable";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function WatchlistPage() {
  const { data = [], isLoading } = useWatchlist();
  return (
    <PageContainer>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">Price tracking</p><h1 className="mb-2 mt-2 text-3xl font-black text-ink">Watchlist</h1><p className="mb-5 text-slate-500">Keep your medicines close and let Medkart watch for better prices.</p>
      {isLoading ? <Skeleton className="h-80" /> : data.length ? <Card className="p-2"><WatchlistTable items={data} /></Card> : (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-black text-ink">Your watchlist is empty</h2>
          <p className="mt-2 text-slate-500">Search for a medicine and tap Track price to add one.</p>
          <Link to="/search" className="mt-4 inline-block"><Button>Search medicines</Button></Link>
        </Card>
      )}
    </PageContainer>
  );
}
