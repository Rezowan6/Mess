import type { InvalidationContext } from "@/shared/types/invalidation.types";

export const currentBill = {
  all: ({ tenantId }: InvalidationContext) =>
    ["current-bill", tenantId] as const,

  list: ({ tenantId }: InvalidationContext) =>
    ["current-bill", tenantId, "list"] as const,

  getById: ({ tenantId, id }: InvalidationContext & { id: number }) =>
    ["current-bill", tenantId, "detail", id] as const,

  deleted: ({ tenantId }: InvalidationContext) =>
    ["current-bill", tenantId, "deleted"] as const,
};
