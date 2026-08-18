import { createWorker } from "tesseract.js";

/**
 * Runs OCR on an image buffer using Tesseract.
 * Returns raw extracted text — no cleanup/structuring here,
 * that happens in postprocess/ and later in the structuring module.
 */
export async function extractTextFromImage(imageBuffer: Buffer): Promise<string> {
  const worker = await createWorker("eng");

  try {
    const {
      data: { text },
    } = await worker.recognize(imageBuffer);
    return text;
  } finally {
    await worker.terminate();
  }
}
