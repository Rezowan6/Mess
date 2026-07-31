import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address").trim(),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
});

export type ILoginFormData = z.infer<typeof loginSchema>;

export type IRegisterFormData = z.infer<typeof registerSchema>;
