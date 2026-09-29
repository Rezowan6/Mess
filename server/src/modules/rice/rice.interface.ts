import type { RicePaymentMethodValue } from "../ricePayment/ricePayment.interface.js";

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

export const RICE_PAYMENT_STATUSES = Object.values(RicePaymentStatus);

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

  purchaseDate: Date;
  dueDate: Date | null;

  note: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

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

  /** CREDIT purchase-এর সময় optional advance payment */
  initialPayment?: {
    amount: number;
    paymentMethod: RicePaymentMethodValue;
    note?: string | null;
  };

  note?: string | null;
}

export interface IUpdateRiceDto {
  quantity?: number;
  unitPrice?: number;
  supplierName?: string | null;
  supplierPhone?: string | null;
  purchaseDate?: Date;
  dueDate?: Date | null;
  note?: string | null;
}

export interface IRiceWithSummary extends IRice {
  totalPaid: number;
  remainingDue: number;
}

