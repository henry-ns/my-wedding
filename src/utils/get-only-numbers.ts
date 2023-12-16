export function getOnlyNumbers(stg?: string): string {
  return stg?.replace(/\D/g, "") || "";
}
