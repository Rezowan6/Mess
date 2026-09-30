import type {
  RicePaymentStatusValue,
  RicePurchaseTypeValue,
} from "../types/rice.types";

type BadgeVariant = "success" | "warning" | "error" | "info";

export const RICE_PURCHASE_TYPE_VARIANT: Record<
  RicePurchaseTypeValue,
  BadgeVariant
> = {
  PAID: "success",
  CREDIT: "warning",
};

export const RICE_PAYMENT_STATUS_VARIANT: Record<
  RicePaymentStatusValue,
  BadgeVariant
> = {
  PAID: "success",
  DUE: "error",
  PARTIAL: "warning",
  SETTLED: "info",
};
