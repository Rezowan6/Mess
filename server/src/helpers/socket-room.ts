export const SocketRoom = {
  user: (userId: number) => `user:${userId}`,

  tenant: (tenantId: number) => `tenant:${tenantId}`,

  mealSession: (tenantId: number, mealSessionId: number) =>
    `tenant:${tenantId}:meal-session:${mealSessionId}`,

  tenantUser: (tenantId: number, userId: number) =>
    `tenant:${tenantId}:user:${userId}`,
} as const;
