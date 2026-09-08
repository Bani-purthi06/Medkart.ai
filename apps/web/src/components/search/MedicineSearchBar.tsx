import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { searchMedicines } from "@/api/medicines";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";

export function MedicineSearchBar({ initialQuery = "", autoFocus = false }: { initialQuery?: string; autoFocus?: boolean }) {
  const [query, setQuery] = useState(initialQuery);
  const debounced = useDebouncedSearch(query);
  const navigate = useNavigate();
  const { data = [] } = useQuery({
    queryKey: ["medicine-suggestions", debounced],
    queryFn: () => searchMedicines(debounced),
    enabled: debounced.length > 1,
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <Input
            autoFocus={autoFocus}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search medicine or salt name"
            className="pl-10"
            aria-label="Search medicine or salt name"
          />
        </div>
        <Button type="submit" icon={<Search className="size-4" />}>
          Search
        </Button>
      </div>
      {data.length > 0 && (
        <div className="absolute z-20 mt-2 w-full rounded-2xl border border-orange-100 bg-white p-2 shadow-soft">
          {data.slice(0, 5).map((medicine) => (
            <button
              key={medicine.id}
              type="button"
              onClick={() => navigate(`/medicine/${medicine.id}`)}
              className="focus-ring flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-orange-50"
            >
              <span>
                <span className="block text-sm font-semibold text-ink">{medicine.medicineName}</span>
                <span className="text-xs text-slate-500">{medicine.salts.map((salt) => salt.saltName).join(", ")}</span>
              </span>
              <span className="text-sm font-bold text-mint">from Rs {medicine.lowestPrice}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}
