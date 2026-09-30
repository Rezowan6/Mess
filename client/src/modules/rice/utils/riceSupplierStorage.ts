const STORAGE_KEY = "rice_supplier";

interface RiceSupplier {
  supplierName: string;
  supplierPhone: string;
  unitPrice: number | undefined;
}

export const getSavedRiceSupplier = (): RiceSupplier => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return {
      supplierName: "",
      supplierPhone: "",
      unitPrice: undefined,
    };
  }

  try {
    return JSON.parse(stored) as RiceSupplier;
  } catch {
    return {
      supplierName: "",
      supplierPhone: "",
      unitPrice: undefined,
    };
  }
};

export const saveRiceSupplier = (
  supplierName: string,
  supplierPhone: string,
  unitPrice: number | undefined,
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      supplierName,
      supplierPhone,
      unitPrice,
    }),
  );
};
