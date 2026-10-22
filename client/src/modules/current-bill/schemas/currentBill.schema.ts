import { z } from "zod";

export const currentBillSchema = z.object({
  userId: z.number().min(1, "Member is required"),

  amount: z.number().min(1, "Amount is required"),

  paymentMethod: z.string().min(1, "Payment method is required"),

  month: z.string().min(1, "Month is required"),
  year: z.string().min(1, "Year is required"),
});

export type CurrentBillFormValues = z.infer<typeof currentBillSchema>;
