export const paymentMethods = {
  all: (tenantId?: number) => ["payment-methods", tenantId] as const,

  list: (tenantId?: number) => ["payment-methods", tenantId, "list"] as const,
};
