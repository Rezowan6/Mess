import { z } from "zod";

export const planSchema = z.object({
  name: z.string().min(2, "Plan name is required."),

  slug: z
    .string()
    .min(2, "Slug is required.")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens.",
    ),

  description: z.string().nullable().optional(),

  monthlyPrice: z.string().min(1, "Monthly price is required."),

  yearlyPrice: z.string().min(1, "Yearly price is required."),

  currency: z
    .string()
    .min(3, "Currency is required.")
    .max(3, "Currency must be 3 characters."),

  durationDays: z.number().min(1, "Duration must be at least 1 day."),

  maxMembers: z.number().refine((value) => value === -1 || value > 0, {
    message: "Use -1 for unlimited or a positive number.",
  }),

  isActive: z.boolean(),
});

export type PlanFormData = z.infer<typeof planSchema>;
