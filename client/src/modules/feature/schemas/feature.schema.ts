import { z } from "zod";

export const featureSchema = z.object({
  name: z.string().min(1, "Feature name is required."),
  slug: z.string().min(1, "Feature slug is required."),
  description: z.string().optional(),
  isActive: z.boolean(),
});

export type FeatureFormValues = z.infer<typeof featureSchema>;
