export interface ICreateEggDto {
  tenantId: number;
  mealSessionId: number;
  memberId: number;
  createdBy: number;
  quantity: number;
  eggDate: Date;
}

export interface IUpdateEggDto {
  quantity?: number;
}
