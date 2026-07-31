import { z } from "zod";

export const mealSettingSchema = z.object({

  breakfastCutoffMinute: z.string(),

  lunchCutoffMinute: z.string(),

  dinnerCutoffMinute: z.string(),
});

export type MealSettingFormValues = z.infer<typeof mealSettingSchema>;
