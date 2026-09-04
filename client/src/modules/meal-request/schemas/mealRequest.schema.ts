import { z } from "zod";

export const mealRequestSchema = z
  .object({
    fromDate: z.string().min(1, "From date is required"),

    toDate: z.string().min(1, "To date is required"),

    breakfast: z.coerce
      .number()
      .int("Breakfast must be a whole number")
      .min(0, "Breakfast cannot be negative"),

    lunch: z.coerce
      .number()
      .int("Lunch must be a whole number")
      .min(0, "Lunch cannot be negative"),

    dinner: z.coerce
      .number()
      .int("Dinner must be a whole number")
      .min(0, "Dinner cannot be negative"),
  })
  .refine((data) => data.fromDate <= data.toDate, {
    message: "From date cannot be greater than to date.",
    path: ["toDate"],
  })
  .refine((data) => data.breakfast > 0 || data.lunch > 0 || data.dinner > 0, {
    message: "Please select at least one meal.",
    path: ["breakfast"],
  });

export type MealRequestFormValues = z.infer<typeof mealRequestSchema>;
