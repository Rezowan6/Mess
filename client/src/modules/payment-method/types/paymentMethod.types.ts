export type PaymentProvider = "BKASH" | "NAGAD" | "ROCKET" | "BANK";

export interface ICreatePaymentMethodDto {
  provider: PaymentProvider;
  accountName: string;
  accountNumber: string;
  isDefault?: boolean;
}

export interface IUpdatePaymentMethodDto {
  provider?: PaymentProvider;
  accountName?: string;
  accountNumber?: string;
  isDefault?: boolean;
  isActive?: boolean;
}

export interface IPaymentMethod {
  id: number;
  tenantId: number;
  userId: number;
  provider: PaymentProvider;
  accountName: string;
  maskedAccountNumber: string;
  accountLast4: string;
  isDefault: boolean;
  isVerified: boolean;
  verifiedAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentMethodListResponse {
  success: boolean;
  message: string;
  data: IPaymentMethod[];
}
