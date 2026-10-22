export const KHALA_BILL_STATUS = ["pending", "partially_paid", "paid"] as const;

export type KhalaBillStatus = (typeof KHALA_BILL_STATUS)[number];

export const KHALA_BILL_PAYMENT_METHODS = [
  "cash",
  "bkash",
  "nagad",
  "rocket",
  "bank",
] as const;

export type KhalaBillPaymentMethod =
  (typeof KHALA_BILL_PAYMENT_METHODS)[number];

export interface IKhalaBillMember {
  id: number;
  name: string;
  email?: string;
  avatar?: string | null;
}

export interface IKhalaBill {
  id: number;
  tenantId: number;
  userId: number;
  createdBy: number | null;
  amount: number;
  status: KhalaBillStatus;
  month: number;
  year: number;
  paymentMethod: KhalaBillPaymentMethod | string;
  member?: IKhalaBillMember;
  creator?: IKhalaBillMember;
  createdAt: string;
  updatedAt: string;
}

export interface IKhalaBillCreateDto {
  userId: number;
  amount: number;
  paymentMethod: KhalaBillPaymentMethod;
  month: number;
  year: number;
}

export type IKhalaBillUpdateDto = Omit<IKhalaBillCreateDto, "userId">;

export interface IKhalaBillListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IKhalaBill[];
}

export interface IKhalaBillResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IKhalaBill | null;
}
