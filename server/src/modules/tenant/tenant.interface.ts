export const TENANT_STATUS = ["active", "inactive"] as const;

export type TenantStatus = (typeof TENANT_STATUS)[number];

