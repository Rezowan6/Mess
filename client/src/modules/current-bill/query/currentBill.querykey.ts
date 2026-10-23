import type { InvalidationContext } from "@/shared/types/invalidation.types";
import type { IPaginationParams } from "@/shared/types/pagination.types";

export const currentBill = {
  all: ({ tenantId }: InvalidationContext) =>
    ["current-bill", tenantId] as const,

  list: ({
    tenantId,
    ...params
  }: InvalidationContext & Partial<IPaginationParams>) =>
    ["current-bill", tenantId, "list", params] as const,

  getById: ({ tenantId, id }: InvalidationContext & { id: number }) =>
    ["current-bill", tenantId, "detail", id] as const,

  deleted: ({ tenantId }: InvalidationContext) =>
    ["current-bill", tenantId, "deleted"] as const,
};
