import { z } from "zod";

import { RICE_PAYMENT_METHODS } from "@/modules/rice-payment/types/ricePayment.types";

export const bulkSettleRiceDueSchema = z.object({
  paymentMethod: z.enum(RICE_PAYMENT_METHODS, {
    error: "Payment method is required",
  }),

  paymentDate: z.string().min(1, "Payment date is required"),

  note: z
    .string()
    .trim()
    .max(255, "Payment note is too long")
    .optional()
    .or(z.literal("")),
});

export type BulkSettleRiceDueFormValues = z.infer<
  typeof bulkSettleRiceDueSchema
>;
