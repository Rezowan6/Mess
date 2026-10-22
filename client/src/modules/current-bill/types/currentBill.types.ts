export const CURRENT_BILL_STATUS = [
  "pending",
  "partially_paid",
  "paid",
] as const;

export type CurrentBillStatus = (typeof CURRENT_BILL_STATUS)[number];

interface Base {
  id: number;
  tenantId: number;
  userId: number;
  createdBy: number;
  amount: number;
  status: CurrentBillStatus;
  month: number;
  year: number;
  paymentMethod: string;
}
export interface ICurrentBill extends Base {}

export interface ICurrentBillListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: ICurrentBill[];
}
