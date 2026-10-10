import type { RiceFormValues } from "../schemas/rice.schema";

interface RiceFieldConfig {
  name: keyof RiceFormValues;
  label: string;
  type?: string;
  placeholder?: string;
  valueAsNumber?: boolean;
}

export const riceFields = {
  quantity: {
    name: "quantity" as const,
    label: "Rice Quantity",
    type: "number",
    placeholder: "Enter rice quantity",
    valueAsNumber: true,
  },
  unitPrice: {
    name: "unitPrice" as const,
    label: "Unit Price",
    type: "number",
    placeholder: "Enter unit price",
    valueAsNumber: true,
  },
  supplierName: {
    name: "supplierName" as const,
    label: "Supplier Name",
    type: "text",
    placeholder: "Enter supplier name",
  },
  supplierPhone: {
    name: "supplierPhone" as const,
    label: "Supplier Phone",
    type: "text",
    placeholder: "Enter supplier phone",
  },
  purchaseDate: {
    name: "purchaseDate" as const,
    label: "Purchase Date",
    type: "date",
  },
  dueDate: {
    name: "dueDate" as const,
    label: "Due Date",
    type: "date",
  },
  initialPaymentDate: {
    name: "initialPaymentDate" as const,
    label: "Payment Date",
    type: "date",
  },
  initialPaymentNote: {
    name: "initialPaymentNote" as const,
    label: "Payment Note",
    type: "text",
    placeholder: "Enter payment note",
  },
  note: {
    name: "note" as const,
    label: "Note",
    type: "text",
    placeholder: "Enter note",
  },
} satisfies Record<string, RiceFieldConfig>;

// Always visible, plain inputs
export const riceBasicFieldList: RiceFieldConfig[] = [
  riceFields.quantity,
  riceFields.unitPrice,
  riceFields.supplierName,
  riceFields.supplierPhone,
];

// Shown only for a paid purchase on create
export const riceInitialPaymentFieldList: RiceFieldConfig[] = [
  riceFields.initialPaymentDate,
  riceFields.initialPaymentNote,
];
