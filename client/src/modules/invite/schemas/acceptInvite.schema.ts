import { z } from "zod";

export const acceptInviteSchema = z
  .object({
    name: z.string().min(2),

    password: z.string().min(6),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type AcceptInviteFormValues = z.infer<typeof acceptInviteSchema>;
