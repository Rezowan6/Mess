export interface ICreatePlanFeatureInput {
  planId: number;
  featureId: number;
  value: string | null;
}

export interface IUpdatePlanFeatureInput {
  value?: string | null;
}
