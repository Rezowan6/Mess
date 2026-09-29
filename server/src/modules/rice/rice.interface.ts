import type { RicePaymentMethodValue } from "../ricePayment/ricePayment.interface.js";

export const RicePurchaseType = {
  PAID: "PAID",
  CREDIT: "CREDIT",
} as const;

export type RicePurchaseTypeValue =
  (typeof RicePurchaseType)[keyof typeof RicePurchaseType];

export const RICE_PURCHASE_TYPES = Object.values(RicePurchaseType);

export const RicePaymentStatus = {
  PAID: "PAID",
  DUE: "DUE",
  PARTIAL: "PARTIAL",
  SETTLED: "SETTLED",
} as const;

export type RicePaymentStatusValue =
  (typeof RicePaymentStatus)[keyof typeof RicePaymentStatus];

export interface ICreateRiceDto {
  tenantId: number;
  mealSessionId: number;
  createdBy: number;
  quantity: number;
  unitPrice: number;
  purchaseType: RicePurchaseTypeValue;
  supplierName?: string | null;
  supplierPhone?: string | null;
  purchaseDate: Date;
  dueDate?: Date | null;
  initialPaymentMethod?: RicePaymentMethodValue;
  initialPaymentDate?: Date;
  initialPaymentNote?: string | null;
  note?: string | null;
}

export interface IUpdateRiceDto {
  quantity?: number;
  unitPrice?: number;
  purchaseType?: RicePurchaseTypeValue;
  supplierName?: string | null;
  supplierPhone?: string | null;
  purchaseDate?: Date;
  dueDate?: Date | null;
  note?: string | null;
}
