import { z } from "zod";

export const partyExpenseSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0."),

  description: z.string().optional(),
  memberIds: z
    .array(z.number())
    .min(1, "At least one member must be selected."),
});

export type PartyExpenseFormValues = z.infer<typeof partyExpenseSchema>;
