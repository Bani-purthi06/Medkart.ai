import { useQuery } from "@tanstack/react-query";
import { Pill } from "lucide-react";
import { useParams } from "react-router-dom";
import { getPrescription } from "@/api/prescriptions";
import { PageContainer } from "@/components/layout/PageContainer";
import { DrugInteractionWarningBanner } from "@/components/search/DrugInteractionWarningBanner";
import { PrescriptionItemRow } from "@/components/prescription/PrescriptionItemRow";
import { OcrProcessingStatus } from "@/components/prescription/OcrProcessingStatus";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { useUiStore } from "@/store/uiStore";

export function PrescriptionReviewPage() {
  const { id = "101" } = useParams();
  const addToast = useUiStore((state) => state.addToast);
  const { data, isLoading } = useQuery({ queryKey: ["prescription", id], queryFn: () => getPrescription(Number(id)), refetchInterval: false });
  if (isLoading) return <PageContainer><OcrProcessingStatus /><Skeleton className="mt-5 h-96" /></PageContainer>;
  if (!data) return null;
  return (
    <PageContainer>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-black text-ink dark:text-white">Review OCR results</h1>
          <p className="text-slate-500">Correct low-confidence lines before comparing prices.</p>
        </div>
        <Button icon={<Pill className="size-4" />} onClick={() => addToast({ tone: "success", message: "Combined comparison prepared" })}>Compare prices for all items</Button>
      </div>
      <DrugInteractionWarningBanner interactions={data.interactions} />
      <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="overflow-hidden"><img src={data.imageUrl} alt="Original prescription" className="h-full min-h-80 w-full object-cover" /></Card>
        <div className="grid content-start gap-3">{data.items.map((item) => <PrescriptionItemRow key={item.id} item={item} />)}</div>
      </div>
    </PageContainer>
  );
}
