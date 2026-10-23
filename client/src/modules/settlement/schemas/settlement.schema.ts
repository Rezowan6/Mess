import { z } from "zod";

export const SETTLEMENT_PAYMENT_METHODS = [
  "CASH",
  "BKASH",
  "NAGAD",
  "ROCKET",
  "BANK",
  "OTHER",
] as const;

export type SettlementPaymentMethod =
  (typeof SETTLEMENT_PAYMENT_METHODS)[number];

export const SETTLEMENT_PAYMENT_METHOD_OPTIONS: {
  label: string;
  value: SettlementPaymentMethod;
}[] = [
  { label: "Cash", value: "CASH" },
  { label: "bKash", value: "BKASH" },
  { label: "Nagad", value: "NAGAD" },
  { label: "Rocket", value: "ROCKET" },
  { label: "Bank", value: "BANK" },
  { label: "Other", value: "OTHER" },
];

// DECIMAL(10,2) in the database
const MAX_AMOUNT = 99_999_999.99;

const hasMaxTwoDecimals = (value: number) =>
  Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;

const idField = z
  .number({ message: "Enter a valid ID" })
  .int("Enter a valid ID")
  .positive("Enter a valid ID")
  .optional();

const baseSchema = z.object({
  memberId: idField,
  payerId: idField,
  payeeId: idField,
  amount: z
    .number({ message: "Amount is required" })
    .positive("Amount must be greater than zero")
    .max(MAX_AMOUNT, "Amount is too large")
    .refine(hasMaxTwoDecimals, "Maximum 2 decimal places"),
  paymentMethod: z.enum(SETTLEMENT_PAYMENT_METHODS, {
    message: "Payment method is required",
  }),
  transactionReference: z
    .string()
    .trim()
    .max(100, "Reference must be at most 100 characters")
    .optional(),
  note: z
    .string()
    .trim()
    .max(500, "Note must be at most 500 characters")
    .optional(),
});

export type SettlementFormValues = z.infer<typeof baseSchema>;

const createSchema = baseSchema.superRefine((values, ctx) => {
  const { memberId, payerId, payeeId } = values;

  for (const key of ["memberId", "payerId", "payeeId"] as const) {
    if (values[key] === undefined) {
      ctx.addIssue({
        code: "custom",
        path: [key],
        message: "This field is required",
      });
    }
  }

  if (payerId !== undefined && payerId === payeeId) {
    ctx.addIssue({
      code: "custom",
      path: ["payeeId"],
      message: "Payer and payee must be different",
    });
  }

  if (
    memberId !== undefined &&
    payerId !== undefined &&
    payeeId !== undefined &&
    memberId !== payerId &&
    memberId !== payeeId
  ) {
    ctx.addIssue({
      code: "custom",
      path: ["memberId"],
      message: "Member must be either the payer or the payee",
    });
  }
});

// Edit mode: payer, payee and member can never change
export const getSettlementSchema = (isEdit: boolean) =>
  isEdit ? baseSchema : createSchema;
