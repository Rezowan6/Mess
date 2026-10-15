import type { PaymentProvider } from "./paymentMethod.model.js";

export interface PaymentMethodAttributes {
  id: string;
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

export interface PaymentMethodResponse {
  id: string;
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

export type CreatePaymentMethodInput = Pick<
  PaymentMethodAttributes,
  | "provider"
  | "accountName"
  | "accountNumberEncrypted"
  | "accountLast4"
  | "isDefault"
>;

export type UpdatePaymentMethodInput = Partial<
  Pick<
    PaymentMethodAttributes,
    "accountName" | "isDefault" | "isActive"
  >
>;