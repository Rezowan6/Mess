import { z } from "zod";

export const createTenantSchema = z.object({
  name: z.string().min(3).max(100),

  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
});
