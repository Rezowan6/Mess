export const formatTaka = (value: number | string): string =>
  `৳${Number(value)}`;

export const formatKg = (value: number | string): string =>
  `${Number(value).toFixed(2)} kg`;

export const toTitleCase = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

export const formatPcs = (value: number | string): string =>
  `${Number(value)} pcs`;
