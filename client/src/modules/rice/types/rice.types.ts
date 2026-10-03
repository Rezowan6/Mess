import type { ApiResponse } from "@/shared/types/api.types";

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

interface IMember {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export interface IRice {
  id: number;
  tenantId: number;
  mealSessionId: number;
  createdBy: number;
  creator: IMember;
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
  /** Sum of all payments. Provided by backend list/details response. */
  totalPaid: number;
  /** totalAmount - totalPaid. Provided by backend list/details response. */
  remainingDue: number;
}
export interface IRiceDueSummary {
  dueCount: number;
  totalDue: number;
  totalAmount: number;
  totalPaid: number;
}

// Same shape as ApiResponse, plus the rice-only due summary
export interface IRiceListResponse extends ApiResponse<IRice[]> {
  dueSummary?: IRiceDueSummary;
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
