import { getOnlyNumbers } from "./get-only-numbers";

export function formatCentsToCurrency(cents?: number): string {
  if (!cents) return "";

  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(cents) / 100);
}

export function formatStringCentsToCurrency(cents?: string): string {
  if (!cents) return "";

  const digits = getOnlyNumbers(cents.toString());

  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(digits) / 100);
}

export function removeCurrentFormat(currency: string): number {
  return Number(getOnlyNumbers(currency));
}
