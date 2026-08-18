export function cleanOcrText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[\t ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(?<=\d)\s+(?=mg|ml|mcg|g|tablet|capsule)/gi, "")
    .trim();
}