export interface ITenant {
  id: number;
  name: string;
  slug?: string;
}

export interface ITenantMembership {
  tenantId: number;
  role: string;

  tenant: ITenant;

  status?: string;
}

export interface ICurrentTenant {
  tenantId: number;
  role: string;
  tenant: ITenant;

  status?: string;
}

export interface ITenantState {

  currentTenant: ICurrentTenant | null;


  setTenant:
  (
    tenant: ICurrentTenant
  ) => void;


  clearTenant:
  () => void;

}