import { z } from "zod";

export const paymentMethodSchema = z.object({
  provider: z.enum(["BKASH", "NAGAD", "ROCKET", "BANK"], {
    message: "Payment provider is required",
  }),

  accountName: z.string().min(1, "Account name is required"),

  accountNumber: z.string().min(1, "Account number is required"),

  isDefault: z.boolean().optional(),
});

export type PaymentMethodFormValues = z.infer<typeof paymentMethodSchema>;