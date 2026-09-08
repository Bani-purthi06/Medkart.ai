import { Spinner } from "@/components/ui/Spinner";

export function OcrProcessingStatus() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-sky/20 bg-sky/5 p-4 text-sky">
      <Spinner />
      <span className="font-semibold">Reading your prescription...</span>
    </div>
  );
}
