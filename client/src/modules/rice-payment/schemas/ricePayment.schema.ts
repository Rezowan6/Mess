import { z } from "zod";

export const RICE_PAYMENT_METHODS = ["CASH", "BKASH", "BANK", "OTHER"] as const;

/**
 * maxAmount = remaining due of the selected purchase.
 * Backend still validates this; the client check is only for fast feedback.
 */
export const createRicePaymentSchema = (maxAmount: number) =>
  z.object({
    amount: z
      .number({ error: "Amount is required" })
      .positive("Amount must be greater than 0")
      .max(maxAmount, `Amount cannot exceed due (${maxAmount.toFixed(2)})`),
    paymentMethod: z.enum(RICE_PAYMENT_METHODS),
    paymentDate: z.string().min(1, "Payment date is required"),
    note: z.string().max(255).optional(),
  });

export type RicePaymentFormValues = z.infer<
  ReturnType<typeof createRicePaymentSchema>
>;
