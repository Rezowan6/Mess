import { z } from "zod";

export const mealRequestSchema = z
  .object({
    breakfast: z.number().min(0).optional(),

    lunch: z.number().min(0).optional(),

    dinner: z.number().min(0).optional(),

    note: z.string().max(255, "Note cannot exceed 255 characters").optional(),
  })
  .refine(
    (data) => data.breakfast || data.lunch || data.dinner,

    {
      message: "Please select at least one meal",
      path: ["breakfast"],
    },
  )

export type IMealRequestFormValues = z.infer<typeof mealRequestSchema>;
