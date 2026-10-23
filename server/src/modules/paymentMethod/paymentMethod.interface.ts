import type { PaymentProvider } from "./paymentMethod.model.js";

export interface IPaymentMethodAttributes {
  id: number;
  tenantId: number;
  userId: number;
  provider: PaymentProvider;
  accountName: string;
  accountNumberEncrypted: string;
  accountLast4: string;
  isDefault: boolean;
  isVerified: boolean;
  verifiedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IPaymentMethodResponse {
  id: number;
  tenantId: number;
  userId: number;
  provider: PaymentProvider;
  accountName: string;
  maskedAccountNumber: string;
  accountLast4: string;
  isDefault: boolean;
  isVerified: boolean;
  verifiedAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreatePaymentMethodInput = Pick<
  IPaymentMethodAttributes,
  | "provider"
  | "accountName"
  | "accountNumberEncrypted"
  | "accountLast4"
  | "isDefault"
>;

export type IUpdatePaymentMethodInput = Partial<
  Pick<
    IPaymentMethodAttributes,
    "accountName" | "isDefault" | "isActive"
  >
>;