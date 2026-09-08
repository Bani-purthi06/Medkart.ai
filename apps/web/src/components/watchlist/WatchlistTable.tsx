import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import type { WatchlistItem } from "@/types";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { useUiStore } from "@/store/uiStore";
import { formatCurrency, formatDate } from "@/utils/format";
import { TargetPriceModal } from "./TargetPriceModal";

export function WatchlistTable({ items }: { items: WatchlistItem[] }) {
  const [editing, setEditing] = useState<WatchlistItem | null>(null);
  const addToast = useUiStore((state) => state.addToast);
  const sorted = [...items].sort((a, b) => a.currentPrice - a.targetPrice - (b.currentPrice - b.targetPrice));

  return (
    <>
      <Table>
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800">
            <th className="px-4 py-3">Medicine</th>
            <th className="px-4 py-3">Current</th>
            <th className="px-4 py-3">Target</th>
            <th className="px-4 py-3">Difference</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((item) => {
            const diff = item.currentPrice - item.targetPrice;
            return (
              <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="px-4 py-4 font-semibold text-ink dark:text-white">{item.medicine.medicineName}</td>
                <td className="px-4 py-4">{formatCurrency(item.currentPrice)}</td>
                <td className="px-4 py-4">{formatCurrency(item.targetPrice)}</td>
                <td className={diff <= 0 ? "px-4 py-4 font-bold text-mint" : "px-4 py-4 font-bold text-coral"}>
                  {diff <= 0 ? "Below target" : `${formatCurrency(diff)} above`}
                </td>
                <td className="px-4 py-4 text-slate-500">{formatDate(item.createdAt)}</td>
                <td className="flex gap-2 px-4 py-4">
                  <Button variant="secondary" className="size-9 px-0" aria-label="Edit target price" onClick={() => setEditing(item)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="ghost" className="size-9 px-0 text-coral" aria-label="Remove from watchlist" onClick={() => addToast({ tone: "info", message: "Removed from watchlist. Undo available." })}>
                    <Trash2 className="size-4" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {editing && (
        <TargetPriceModal
          open
          currentPrice={editing.currentPrice}
          onClose={() => setEditing(null)}
          onSave={() => {
            setEditing(null);
            addToast({ tone: "success", message: "Target price updated" });
          }}
        />
      )}
    </>
  );
}
