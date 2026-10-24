import { IPaginationQuery } from "@/types/pagination.interface.js";
import type {
  CreateCurrentBillBody,
  UpdateCurrentBillBody,
} from "./currentBill.validation.js";

export const CURRENT_BILL_STATUS = [
  "pending",
  "partially_paid",
  "paid",
] as const;

export type CurrentBillStatus = (typeof CURRENT_BILL_STATUS)[number];

export type ICreateCurrentBillDto = CreateCurrentBillBody & {
  tenantId: number;
  createdBy: number;
};

export type IUpdateCurrentBillDto = UpdateCurrentBillBody & {
  id: number;
  tenantId: number;
  createdBy: number;
};

export interface IDeleteCurrentBillDto {
  id: number;
  tenantId: number;
  createdBy: number;
}

// Same shape as delete: the record id, the tenant and the user who did the action
export type IRestoreCurrentBillDto = IDeleteCurrentBillDto;

export interface IGetCurrentBills {
  tenantId: number;
  month: number;
  year: number;
  query: IPaginationQuery;
}

export interface IGetBYIdCurrentBill {
  tenantId: number;
  userId: number;
  year: number;
}
