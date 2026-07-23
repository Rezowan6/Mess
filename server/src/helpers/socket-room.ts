export const SocketRoom = {
  user: (userId: number) => `user:${userId}`,

  tenant: (tenantId: number) => `tenant:${tenantId}`,
} as const;
