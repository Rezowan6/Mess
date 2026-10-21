export const formatCurrency = (
  amount: number,
  currency = "BDT",
  locale = "en-BD",
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};