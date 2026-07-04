import z from "zod";

export const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type CreateInvitePayload = z.infer<typeof inviteSchema>;
