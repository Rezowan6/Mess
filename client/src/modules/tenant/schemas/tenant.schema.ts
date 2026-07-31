import z from "zod";

export const tenantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
});

export type ITenantFormData = z.infer<typeof tenantSchema>;
