import { Camera, FileImage, RotateCw, UploadCloud } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";

export function PrescriptionUploader({ onUpload }: { onUpload: (file: File) => Promise<void> }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [rotation, setRotation] = useState(0);
  const [uploading, setUploading] = useState(false);

  function pick(nextFile?: File) {
    if (!nextFile) return;
    if (!nextFile.type.startsWith("image/")) {
      setError("Please upload a prescription image file.");
      return;
    }
    if (nextFile.size > 8 * 1024 * 1024) {
      setError("Please keep the image under 8 MB.");
      return;
    }
    setError("");
    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
  }

  async function submit() {
    if (!file) {
      setError("Choose or take a prescription photo first.");
      return;
    }
    setUploading(true);
    await onUpload(file);
    setUploading(false);
  }

  return (
    <Card className="p-4 sm:p-6">
      <label
        className="focus-within:ring-2 focus-within:ring-mint grid min-h-56 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-900"
        onDrop={(event) => {
          event.preventDefault();
          pick(event.dataTransfer.files[0]);
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        <input className="sr-only" type="file" accept="image/*" onChange={(event: ChangeEvent<HTMLInputElement>) => pick(event.target.files?.[0])} />
        <div>
          <UploadCloud className="mx-auto mb-3 size-10 text-mint" />
          <p className="font-bold text-ink dark:text-white">Drop prescription here</p>
          <p className="text-sm text-slate-500">Take a photo or choose an image for OCR extraction.</p>
        </div>
      </label>
      {error && <p className="mt-3 rounded-md bg-coral/10 p-3 text-sm text-coral">{error}</p>}
      {preview && (
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
            <img src={preview} alt="Prescription preview" className="max-h-96 w-full object-contain transition" style={{ transform: `rotate(${rotation}deg)` }} />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" icon={<RotateCw className="size-4" />} onClick={() => setRotation((value) => value + 90)}>
              Rotate
            </Button>
            <Button variant="secondary" icon={<Camera className="size-4" />}>
              Take photo
            </Button>
            <Button icon={uploading ? <Spinner /> : <FileImage className="size-4" />} onClick={submit} disabled={uploading}>
              {uploading ? "Uploading" : "Read prescription"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
