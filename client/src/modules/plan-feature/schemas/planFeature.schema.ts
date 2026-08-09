import { z } from "zod";

export const planFeatureSchema = z.object({
  planId: z.number().min(1, "Plan is required."),
  featureId: z.number().min(1, "Feature is required."),
  value: z.string().nullable(),
});

export type PlanFeatureFormValues = z.infer<typeof planFeatureSchema>;
