import { Router } from "express";
import multer from "multer";
import { extractTextFromImage } from "../modules/ocr/providers/tesseract.provider";
import { cleanOcrText } from "../modules/ocr/postprocess/clean-text";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided (field name: 'image')" });
    }

    const rawText = await extractTextFromImage(req.file.buffer);
    const cleanedText = cleanOcrText(rawText);

    res.status(201).json({ prescriptionId: Date.now(), rawText, cleanedText });
  } catch (error) {
    next(error);
  }
});

export default router;