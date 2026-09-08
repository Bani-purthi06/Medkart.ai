import { useNavigate } from "react-router-dom";
import { uploadPrescription } from "@/api/prescriptions";
import { PageContainer } from "@/components/layout/PageContainer";
import { PrescriptionUploader } from "@/components/prescription/PrescriptionUploader";
import { useUiStore } from "@/store/uiStore";

export function PrescriptionUploadPage() {
  const navigate = useNavigate();
  const addToast = useUiStore((state) => state.addToast);
  return (
    <PageContainer narrow>
      <h1 className="mb-2 text-3xl font-black text-ink dark:text-white">Upload prescription</h1>
      <p className="mb-5 text-slate-500">Preview, rotate, and submit an image for OCR review.</p>
      <PrescriptionUploader
        onUpload={async () => {
          try {
            const result = await uploadPrescription();
            addToast({ tone: "success", message: "Prescription uploaded" });
            navigate(`/prescription/${result.id}`);
          } catch {
            addToast({ tone: "error", message: "Upload failed. Try again or type it manually." });
          }
        }}
      />
    </PageContainer>
  );
}
