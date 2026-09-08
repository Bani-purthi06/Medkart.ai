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
      <h1 className="mb-5 text-3xl font-black text-ink dark:text-white">Watchlist</h1>
      {isLoading ? <Skeleton className="h-80" /> : data.length ? <Card className="p-2"><WatchlistTable items={data} /></Card> : (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-black text-ink dark:text-white">Your watchlist is empty</h2>
          <p className="mt-2 text-slate-500">Search for a medicine and tap Track price to add one.</p>
          <Link to="/search" className="mt-4 inline-block"><Button>Search medicines</Button></Link>
        </Card>
      )}
    </PageContainer>
  );
}
