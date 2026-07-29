import type { IPaginationMeta } from "@/shared/types/pagination.types";

export interface IDeposit {
  id: number;

  member: {
    id: number;
    name: string;
    email: string;
  };

  tenantId: number;

  mealSessionId: number;

  memberId: number;

  createdBy: number;

  amount: number;

  totalDeposit?: number;

  paymentMethod: string;

  depositDate: string;

  note?: string | null;

  createdAt: string;

  updatedAt: string;
}

export interface ICreateDepositDto {
  memberId: number;

  amount: number;

  paymentMethod: string;

  depositDate?: string;

  note?: string;
}

export interface IUpdateDepositDto {
  memberId: number;

  amount: number;

  paymentMethod: string;

  note?: string;
}

export interface IDepositQuery {
  page?: number;

  limit?: number;

  search?: string;

  memberId?: number;

  paymentMethod?: string;

  mealSessionId?: number;
}

export interface IDepositListResponse {
  statusCode: number;

  success: boolean;

  message: string;

  data: IDeposit[];

  meta: IPaginationMeta;
}
