import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const currentBill = {
  all: ({ tenantId }: InvalidationContext) => ["current-bill", tenantId] as const,

  list: ({ tenantId }: InvalidationContext) =>
    ["current-bill", tenantId, "list"] as const,
  getById: ({ tenantId }: InvalidationContext) =>
    ["current-bill", tenantId, "get-by-id"] as const,
};