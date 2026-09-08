import { ArrowUpDown, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import type { PlatformPrice } from "@/types";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format";
import { CheapestBadge } from "./CheapestBadge";

type SortKey = "platformName" | "sellingPrice" | "deliveryEta";

export function PriceTable({ prices }: { prices: PlatformPrice[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("sellingPrice");
  const sorted = useMemo(
    () => [...prices].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1)),
    [prices, sortKey],
  );
  const best = Math.min(...prices.filter((price) => price.inStock).map((price) => price.sellingPrice));

  return (
    <Table>
      <thead>
        <tr className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800">
          {[
            ["platformName", "Platform"],
            ["sellingPrice", "Price"],
            ["deliveryEta", "Delivery"],
          ].map(([key, label]) => (
            <th key={key} className="px-4 py-3">
              <button className="focus-ring inline-flex items-center gap-1 rounded" onClick={() => setSortKey(key as SortKey)}>
                {label}
                <ArrowUpDown className="size-3" />
              </button>
            </th>
          ))}
          <th className="px-4 py-3">Stock</th>
          <th className="px-4 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((price) => {
          const cheapest = price.inStock && price.sellingPrice === best;
          return (
            <tr
              key={price.id}
              className={cn(
                "border-b border-slate-100 dark:border-slate-800",
                cheapest && "bg-amber/10",
                !price.inStock && "opacity-50",
              )}
            >
              <td className="px-4 py-4 font-semibold text-ink dark:text-white">
                <div className="flex items-center gap-2">
                  {price.platformName}
                  {cheapest && <CheapestBadge />}
                </div>
              </td>
              <td className="px-4 py-4 font-bold">{formatCurrency(price.sellingPrice)}</td>
              <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{price.deliveryEta}</td>
              <td className="px-4 py-4">
                <span className={price.inStock ? "text-mint" : "text-coral"}>{price.inStock ? "In stock" : "Out of stock"}</span>
              </td>
              <td className="px-4 py-4">
                <Button variant="secondary" disabled={!price.inStock} icon={<ExternalLink className="size-4" />}>
                  Open
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
