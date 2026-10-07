/** Formats a number to IDR currency string (e.g. 10000 -> Rp10.000) */
export function formatIDR(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Formats a number to percentage string (e.g. 0.15 -> 15.0%) */
export function formatPercent(value: number | null | undefined, decimals = 1): string {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Formats a number as a multiple (e.g. 15.2 -> 15.2x) */
export function formatMultiple(value: number | null | undefined, decimals = 1): string {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value) + 'x';
}

/** Formats large numbers compactly (e.g. 1,500,000 -> 1.5M in ID locale) */
export function formatCompactNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return '-';
  return new Intl.NumberFormat('id-ID', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}
