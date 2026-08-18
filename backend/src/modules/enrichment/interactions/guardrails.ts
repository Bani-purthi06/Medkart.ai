import { InteractionLookupResult } from "./lookup";

export function summarizeInteraction(result: InteractionLookupResult): string {
  return `${result.riskLevel.toUpperCase()}: ${result.note}`;
}