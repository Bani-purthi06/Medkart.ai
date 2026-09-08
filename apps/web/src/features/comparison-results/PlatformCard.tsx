import type { PlatformPrice } from "@/types";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriceTag } from "@/components/search/PriceTag";
import { CheapestBadge } from "./CheapestBadge";

export function PlatformCard({ price, cheapest }: { price: PlatformPrice; cheapest: boolean }) {
  return (
    <Card className={cheapest ? "border-amber/60 p-4" : "p-4"}>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-ink dark:text-white">{price.platformName}</h3>
          <p className="text-sm text-slate-500">{price.deliveryEta} delivery</p>
        </div>
        {cheapest && <CheapestBadge />}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <PriceTag price={price.sellingPrice} deltaPct={price.deltaPct} />
        <Button disabled={!price.inStock} variant={price.inStock ? "primary" : "secondary"}>
          {price.inStock ? "Open" : "Out"}
        </Button>
      </div>
    </Card>
  );
}
