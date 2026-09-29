export const RicePurchaseType = {
  PAID: "PAID",
  CREDIT: "CREDIT",
} as const;

export const RICE_PURCHASE_TYPES = Object.values(RicePurchaseType);

export type RicePurchaseTypeValue =
  (typeof RicePurchaseType)[keyof typeof RicePurchaseType];

export const RicePaymentStatus = {
  PAID: "PAID",
  DUE: "DUE",
  PARTIAL: "PARTIAL",
  SETTLED: "SETTLED",
} as const;

export type RicePaymentStatusValue =
  (typeof RicePaymentStatus)[keyof typeof RicePaymentStatus];

export interface IRice {
  id: number;
  tenantId: number;
  mealSessionId: number;
  createdBy: number;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  purchaseType: RicePurchaseTypeValue;
  paymentStatus: RicePaymentStatusValue;
  supplierName: string | null;
  supplierPhone: string | null;
  purchaseDate: string;
  dueDate: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateRice {
  quantity: number;
  unitPrice: number;
  purchaseType: RicePurchaseTypeValue;
  supplierName?: string | null;
  supplierPhone?: string | null;
  purchaseDate?: string;
  dueDate?: string | null;
  initialPaymentMethod?: string;
  initialPaymentDate?: string;
  initialPaymentNote?: string | null;
  note?: string | null;
}

export interface IUpdateRice {
  quantity?: number;
  unitPrice?: number;
  purchaseType?: RicePurchaseTypeValue;
  supplierName?: string | null;
  supplierPhone?: string | null;
  purchaseDate?: string;
  dueDate?: string | null;
  note?: string | null;
}
