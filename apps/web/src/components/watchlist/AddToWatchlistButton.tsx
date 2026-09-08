import { BellPlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useUiStore } from "@/store/uiStore";
import { TargetPriceModal } from "./TargetPriceModal";

export function AddToWatchlistButton({ medicineId, currentPrice }: { medicineId: number; currentPrice: number }) {
  const [open, setOpen] = useState(false);
  const [tracked, setTracked] = useState(false);
  const addToast = useUiStore((state) => state.addToast);

  return (
    <>
      <Button variant={tracked ? "secondary" : "primary"} icon={<BellPlus className="size-4" />} onClick={() => setOpen(true)}>
        {tracked ? "Tracked" : "Track price"}
      </Button>
      <TargetPriceModal
        open={open}
        currentPrice={currentPrice}
        onClose={() => setOpen(false)}
        onSave={() => {
          setTracked(true);
          setOpen(false);
          addToast({ tone: "success", message: `Medicine ${medicineId} added to watchlist` });
        }}
      />
    </>
  );
}
