import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number().min(1, "Amount is required"),

  signature: z.string().min(1, "Signature is required"),

  category: z.string().optional(),

  description: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
