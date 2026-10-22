import { z } from "zod";

import { hasMaxTwoDecimals, MAX_MONEY_AMOUNT } from "@/shared/utils/form.utils";
import { KHALA_BILL_PAYMENT_METHODS } from "../types/khalaBill.types";

export const KHALA_BILL_PAYMENT_METHOD_OPTIONS = [
  { label: "Cash", value: "cash" },
  { label: "bKash", value: "bkash" },
  { label: "Nagad", value: "nagad" },
  { label: "Rocket", value: "rocket" },
  { label: "Bank", value: "bank" },
] as const;

const baseSchema = z.object({
  userId: z.number().int().positive().optional(),

  amount: z
    .number({ message: "Amount is required" })
    .positive("Amount must be greater than zero")
    .max(MAX_MONEY_AMOUNT, "Amount is too large")
    .refine(hasMaxTwoDecimals, "Maximum 2 decimal places"),

  paymentMethod: z.enum(KHALA_BILL_PAYMENT_METHODS, {
    message: "Payment method is required",
  }),

  month: z
    .number({ message: "Month is required" })
    .int()
    .min(1, "Select a valid month")
    .max(12, "Select a valid month"),

  year: z
    .number({ message: "Year is required" })
    .int()
    .min(2000, "Select a valid year")
    .max(2100, "Select a valid year"),
});

export type KhalaBillFormValues = z.infer<typeof baseSchema>;

const createSchema = baseSchema.refine(
  (values) => values.userId !== undefined,
  {
    path: ["userId"],
    message: "Select a member",
  },
);

export const getKhalaBillSchema = (isEdit: boolean) =>
  isEdit ? baseSchema : createSchema;
