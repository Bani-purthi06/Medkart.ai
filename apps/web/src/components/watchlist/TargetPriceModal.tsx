import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

export function TargetPriceModal({
  open,
  currentPrice,
  onClose,
  onSave,
}: {
  open: boolean;
  currentPrice: number;
  onClose: () => void;
  onSave: (targetPrice: number) => void;
}) {
  const [target, setTarget] = useState(String(Math.max(1, Math.round(currentPrice * 0.9))));
  return (
    <Modal open={open} title="Set target price" onClose={onClose}>
      <div className="grid gap-4">
        <label className="grid gap-1 text-sm font-semibold">
          Target price
          <Input value={target} onChange={(event) => setTarget(event.target.value)} type="number" min={1} />
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(Number(target))}>Save target</Button>
        </div>
      </div>
    </Modal>
  );
}
