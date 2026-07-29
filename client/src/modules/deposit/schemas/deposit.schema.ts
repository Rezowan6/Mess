import { z } from "zod";

export const depositSchema = z.object({
  memberId: z.number().min(1, "Member is required"),

  amount: z.number().min(1, "Amount is required"),

  paymentMethod: z.string().min(1, "Payment method is required"),

  note: z.string().optional(),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
