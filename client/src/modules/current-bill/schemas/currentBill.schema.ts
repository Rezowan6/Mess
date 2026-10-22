import { z } from "zod";

import { hasMaxTwoDecimals, MAX_MONEY_AMOUNT } from "@/shared/utils/form.utils";

export const CURRENT_BILL_PAYMENT_METHODS = [
  "cash",
  "bkash",
  "nagad",
  "rocket",
  "bank",
] as const;

export type CurrentBillPaymentMethod =
  (typeof CURRENT_BILL_PAYMENT_METHODS)[number];

export const CURRENT_BILL_PAYMENT_METHOD_OPTIONS: {
  label: string;
  value: CurrentBillPaymentMethod;
}[] = [
  { label: "Cash", value: "cash" },
  { label: "bKash", value: "bkash" },
  { label: "Nagad", value: "nagad" },
  { label: "Rocket", value: "rocket" },
  { label: "Bank", value: "bank" },
];

// Old records may hold free text like "Cash" or "bKash"
export const normalizePaymentMethod = (
  value?: string | null,
): CurrentBillPaymentMethod => {
  const key = (value ?? "").toLowerCase().replace(/\s+/g, "");

  return (
    CURRENT_BILL_PAYMENT_METHODS.find((method) => method === key) ?? "cash"
  );
};

const baseSchema = z.object({
  userId: z
    .number({ message: "Select a member" })
    .int("Select a member")
    .positive("Select a member")
    .optional(),
  amount: z
    .number({ message: "Amount is required" })
    .positive("Amount must be greater than zero")
    .max(MAX_MONEY_AMOUNT, "Amount is too large")
    .refine(hasMaxTwoDecimals, "Maximum 2 decimal places"),
  paymentMethod: z.enum(CURRENT_BILL_PAYMENT_METHODS, {
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

export type CurrentBillFormValues = z.infer<typeof baseSchema>;

const createSchema = baseSchema.refine(
  (values) => values.userId !== undefined,
  {
    path: ["userId"],
    message: "Select a member",
  },
);

// Edit mode: the member of a bill can never change
export const getCurrentBillSchema = (isEdit: boolean) =>
  isEdit ? baseSchema : createSchema;
