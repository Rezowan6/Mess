import { z } from "zod";

import { DepositPaymentMethod } from "../deposit/deposit.interface.js";

// DECIMAL(12,2) in the database, this smaller limit catches typing mistakes
const MAX_AMOUNT = 99_999_999.99;

const hasMaxTwoDecimals = (value: number) =>
  Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;

const positiveInt = (label: string) =>
  z
    .number({ error: `${label} must be a number` })
    .int(`${label} must be a whole number`)
    .positive(`${label} must be greater than zero`);

const amountSchema = z
  .number({ error: "Amount must be a number" })
  .positive("Amount must be greater than zero")
  .max(MAX_AMOUNT, "Amount is too large")
  .refine(hasMaxTwoDecimals, "Amount can have at most 2 decimal places");

const paymentMethodSchema = z.enum(DepositPaymentMethod, {
  error: "Invalid payment method",
});

// strictObject: unknown keys (id, status, tenantId...) are rejected, not silently stored
export const createCurrentBillSchema = z.strictObject({
  userId: positiveInt("userId"),
  amount: amountSchema,
  paymentMethod: paymentMethodSchema,
  month: z
    .number({ error: "Month must be a number" })
    .int("Month must be a whole number")
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  year: z
    .number({ error: "Year must be a number" })
    .int("Year must be a whole number")
    .min(2000, "Year is not valid")
    .max(2100, "Year is not valid"),
});

// Only the amount and the payment method can change. The member and the month never can.
export const updateCurrentBillSchema = z
  .strictObject({
    amount: amountSchema.optional(),
    paymentMethod: paymentMethodSchema.optional(),
  })
  .refine(
    (values) =>
      values.amount !== undefined || values.paymentMethod !== undefined,
    { error: "At least one field is required" },
  );

export const currentBillIdParamSchema = z.object({
  id: z.coerce
    .number({ error: "Id must be a number" })
    .int("Id must be a whole number")
    .positive("Id must be greater than zero"),
});

export type CreateCurrentBillBody = z.infer<typeof createCurrentBillSchema>;
export type UpdateCurrentBillBody = z.infer<typeof updateCurrentBillSchema>;
