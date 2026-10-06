export const tenants = {
  all: ["tenants"] as const,
  allMembers: (tenantId?: number, search?: string) =>
    ["tenants", tenantId, "members", "all", { search }] as const,
  members: (tenantId?: number) => ["tenants", tenantId, "members"] as const,
  invites: (tenantId?: number) => ["tenants", tenantId, "invites"] as const,
};
