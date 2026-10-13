// Every tenant-owned resource must be scoped by tenant
export interface ITenantScope {
  tenantId: number;
}

// Resources that also belong to a meal session
export interface ISessionScope extends ITenantScope {
  mealSessionId: number;
}
