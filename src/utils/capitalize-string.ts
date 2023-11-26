export function capitalizeString(str: string): string {
  const capitalizedStr = str
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

  return capitalizedStr;
}
