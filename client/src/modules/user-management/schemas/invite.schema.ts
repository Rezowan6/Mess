import { z } from "zod";

import { ROLES } from "@/shared/constants/roles";

export const inviteSchema = z.object({
  email: z.string().email("Invalid email address"),

  role: z.enum([ROLES.MANAGER, ROLES.MEMBER]),
});

export type InviteFormValues = z.infer<typeof inviteSchema>;
