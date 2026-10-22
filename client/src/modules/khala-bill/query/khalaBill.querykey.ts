import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const khalaBill = {
  all: ({ tenantId }: InvalidationContext) => ["khala-bill", tenantId] as const,

  list: ({ tenantId }: InvalidationContext) =>
    ["khala-bill", tenantId, "list"] as const,

  getById: ({ tenantId, userId }: InvalidationContext & { userId: number }) =>
    ["khala-bill", tenantId, "member-history", userId] as const,
};
