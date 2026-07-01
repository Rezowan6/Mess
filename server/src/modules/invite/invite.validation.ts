import z from "zod";

import { InviteRole } from "./invite.interface.js";

export const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.nativeEnum(InviteRole).default(InviteRole.USER),
  message: z.string().max(50, "Message too long").optional(),
  maxUses: z.number().int().positive().optional(),
});

export type CreateInvitePayload = z.infer<typeof inviteSchema>;
