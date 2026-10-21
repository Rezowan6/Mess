export const CURRENT_BILL_STATUS = [
  "pending",
  "partially_paid",
  "paid",
] as const;

export type CurrentBillStatus = (typeof CURRENT_BILL_STATUS)[number];

interface Base {
  tenantId: number;
  userId: number;
  createdBy: number;
  amount: number;
  status: CurrentBillStatus;
  month: number;
  year: number;
}

export interface ICreateCuttentBillDto extends Base {}
export interface IUpdateCuttentBillDto extends Base {
  id: number;
}
export interface IDeleteCuttentBillDto {
  id: number;
  tenantId: number;
  createdBy: number;
}

export interface IGetCurrentBills {
  tenantId: number;
  month: number;
  year: number;
}

export interface IGetBYIdCurrentBill {
  tenantId: number;
  userId: number;
  year: number;
}
