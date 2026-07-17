export const queryKeys = {
  auth: ["auth"],
  authMe: ["auth_me"],
  tenantMembers: (tenantId?: number) => ["tenant-members", tenantId],
  profile: ["profile"],
  users: ["users"],
  tenants: ["tenants"],
  mealSessions: ["meal_sessions"],
  mealEntries: ["meal_entries"],
  expenses: ["expenses"],
  deposits: ["deposits"],
};
