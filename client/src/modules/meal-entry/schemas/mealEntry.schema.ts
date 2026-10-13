import { z } from "zod";

export const createMealEntrySchema = z.object({
  memberId: z.number().int().positive("Please select a member"),
  mealSessionId: z.number().int().positive("Please select a meal session"),
  mealRequestId: z.number().int().positive("Please select a meal request"),
  date: z.string().min(1, "Date is required"),
  breakfast: z.number().min(0, "Breakfast cannot be negative"),
  lunch: z.number().min(0, "Lunch cannot be negative"),
  dinner: z.number().min(0, "Dinner cannot be negative"),
});

export const updateMealEntrySchema = z.object({
  breakfast: z.number().min(0, "Breakfast cannot be negative"),
  lunch: z.number().min(0, "Lunch cannot be negative"),
  dinner: z.number().min(0, "Dinner cannot be negative"),
});

export type CreateMealEntryFormValues = z.infer<
  typeof createMealEntrySchema
>;

export type UpdateMealEntryFormValues = z.infer<
  typeof updateMealEntrySchema
>;