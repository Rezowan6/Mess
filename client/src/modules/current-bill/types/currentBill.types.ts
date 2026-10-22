import type { IPaginationMeta } from "@/shared/types/pagination.types";

export const CURRENT_BILL_STATUS = [
  "pending",
  "partially_paid",
  "paid",
] as const;

export type CurrentBillStatus = (typeof CURRENT_BILL_STATUS)[number];

interface ICurrentBillBase {
  id: number;
  tenantId: number;
  userId: number;
  createdBy: number;
  amount: number;
  status: CurrentBillStatus;
  month: number;
  year: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface ICurrentBill extends ICurrentBillBase {
  member?: {
    id: number;
    name: string;
    email?: string;
    avatar?: string | null;
  };
}
export interface ICurrentBillListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ICurrentBill[];
  meta?: IPaginationMeta;
}

export interface ICurrentBillCreateDto {
  userId: number;
  amount: number;
  paymentMethod: string;
  month: number;
  year: number;
}
