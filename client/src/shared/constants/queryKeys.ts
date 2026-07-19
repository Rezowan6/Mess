export const queryKeys = {
  auth: ["auth"],
  authMe: ["auth_me"],
  tenantMembers: (tenantId?: number) => ["tenant-members", tenantId],
  invites: (tenantId?: number) => ["invites", tenantId],
  mealSessions: (tenantId?: number) => ["meal-sessions", tenantId],
  expenses: (tenantId?: number) => ["expenses", tenantId],

};
