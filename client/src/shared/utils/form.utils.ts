// DECIMAL(10,2) in the database
export const MAX_MONEY_AMOUNT = 99_999_999.99;

// Empty input -> undefined (valueAsNumber would give NaN)
export const toNumber = (value: unknown): number | undefined =>
  value === "" || value === null || value === undefined
    ? undefined
    : Number(value);

export const toMoney = (value: number): number => Math.round(value * 100) / 100;

export const hasMaxTwoDecimals = (value: number): boolean =>
  Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;
