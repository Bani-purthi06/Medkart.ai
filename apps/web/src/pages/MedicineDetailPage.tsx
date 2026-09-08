import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMedicine } from "@/api/medicines";
import { PageContainer } from "@/components/layout/PageContainer";
import { AddToWatchlistButton } from "@/components/watchlist/AddToWatchlistButton";
import { DrugInteractionWarningBanner } from "@/components/search/DrugInteractionWarningBanner";
import { GenericSubstituteCard } from "@/components/search/GenericSubstituteCard";
import { NppaComplianceBadge } from "@/components/search/NppaComplianceBadge";
import { PriceTrendChart } from "@/components/search/PriceTrendChart";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { PriceTable } from "@/features/comparison-results/PriceTable";

export function MedicineDetailPage() {
  const { id = "1" } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ["medicine", id], queryFn: () => getMedicine(Number(id)) });
  if (isLoading) return <PageContainer><Skeleton className="mb-4 h-32" /><Skeleton className="h-80" /></PageContainer>;
  if (!data) return null;
  const { medicine, prices, history, substitutes, interactions } = data;
  const best = Math.min(...prices.filter((price) => price.inStock).map((price) => price.sellingPrice));
  return (
    <PageContainer>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-ink dark:text-white">{medicine.medicineName}</h1>
          <p className="mt-1 text-slate-500">{medicine.brandName} | {medicine.dosageForm} | {medicine.strength} | {medicine.manufacturer}</p>
          <div className="mt-3"><NppaComplianceBadge ceiling={medicine.nppaCeiling} price={best} /></div>
        </div>
        <AddToWatchlistButton medicineId={medicine.id} currentPrice={best} />
      </div>
      <div className="grid gap-5">
        <Card className="p-2"><PriceTable prices={prices} /></Card>
        <PriceTrendChart data={history} />
        <DrugInteractionWarningBanner interactions={interactions} />
        <section>
          <h2 className="mb-3 text-xl font-black text-ink dark:text-white">Salt composition</h2>
          <div className="flex flex-wrap gap-2">{medicine.salts.map((salt) => <span key={salt.id} className="rounded-full bg-white px-3 py-2 text-sm font-semibold dark:bg-slate-900">{salt.saltName} {salt.saltStrength} | {salt.therapeuticClass}</span>)}</div>
        </section>
        {substitutes.length > 0 && <section><h2 className="mb-3 text-xl font-black text-ink dark:text-white">Generic substitutes</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{substitutes.map((item) => <GenericSubstituteCard key={item.id} substitute={item} />)}</div></section>}
      </div>
    </PageContainer>
  );
}
