export interface ICreateEggRateDto {
  tenantId: number;
  mealSessionId: number;
  rate: number;
  createdBy: number;
}

export interface IUpdateEggRateDto {
  rate?: number;
}
