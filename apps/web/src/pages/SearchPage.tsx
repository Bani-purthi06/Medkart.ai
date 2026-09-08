import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { searchMedicines } from "@/api/medicines";
import { PageContainer } from "@/components/layout/PageContainer";
import { MedicineSearchBar } from "@/components/search/MedicineSearchBar";
import { SearchResultCard } from "@/components/search/SearchResultCard";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export function SearchPage() {
  const [params] = useSearchParams();
  const [form, setForm] = useState("all");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState("relevance");
  const q = params.get("q") ?? "";
  const { data = [], isLoading, isError, refetch } = useQuery({ queryKey: ["search", q, form, inStock], queryFn: () => searchMedicines(q, { form, inStock }) });
  const results = [...data].sort((a, b) => sort === "price" ? a.lowestPrice - b.lowestPrice : 0);

  return (
    <PageContainer>
      <div className="sticky top-16 z-20 -mx-4 border-b border-orange-100 bg-orange-50/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <MedicineSearchBar initialQuery={q} />
      </div>
      <div className="my-5 flex flex-wrap items-center gap-3">
        <select className="focus-ring rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm text-slate-700" value={form} onChange={(event) => setForm(event.target.value)}>
          <option value="all">All forms</option><option>Tablet</option><option>Syrup</option><option>Injection</option><option>Capsule</option>
        </select>
        <label className="flex items-center gap-2 rounded-xl border border-orange-100 bg-white px-3 py-2 text-sm font-semibold text-slate-700"><input type="checkbox" className="accent-orange-500" checked={inStock} onChange={(event) => setInStock(event.target.checked)} /> In stock only</label>
        <select className="focus-ring rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm text-slate-700" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="relevance">Relevance</option><option value="price">Price low to high</option>
        </select>
      </div>
      {isLoading ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48" />)}</div> : isError ? (
        <Card className="p-6 text-center"><p className="mb-4 text-coral">Search failed.</p><button className="font-semibold text-mint" onClick={() => refetch()}>Retry</button></Card>
      ) : results.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map((medicine) => <SearchResultCard key={medicine.id} medicine={medicine} />)}</div>
      ) : (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-black text-ink">No medicines matched "{q}"</h2>
          <p className="mt-2 text-slate-500">Did you mean paracetamol, azithromycin, or telmisartan?</p>
          <Link className="mt-4 inline-block font-semibold text-mint" to="/search?q=paracetamol">Try the generic name</Link>
        </Card>
      )}
    </PageContainer>
  );
}
