import type {
  RicePaymentStatusValue,
  RicePurchaseTypeValue,
} from "../types/rice.types";

type BadgeVariant = "soft-success" | "soft-error" | "soft-warning" | "soft-info";

export const RICE_PURCHASE_TYPE_VARIANT: Record<
  RicePurchaseTypeValue,
  BadgeVariant
> = {
  PAID: "soft-success",
  CREDIT: "soft-warning",
};

export const RICE_PAYMENT_STATUS_VARIANT: Record<
  RicePaymentStatusValue,
  BadgeVariant
> = {
  PAID: "soft-success",
  DUE: "soft-error",
  PARTIAL: "soft-warning",
  SETTLED: "soft-info",
};
