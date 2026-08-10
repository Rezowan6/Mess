import { z } from "zod";

export const subscriptionSchema = z.object({
  planId: z.number().min(1, "Plan is required."),
});

export type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;