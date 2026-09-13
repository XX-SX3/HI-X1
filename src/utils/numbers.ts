/** Format a number with English (Western) digits and thousands separators, e.g. 7,234 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

/** Pad to 2 digits using English digits, e.g. 7 -> "07" */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}
