export interface ICreateSoldProductDto {
  tenantId: number;
  mealSessionId: number;
  totalAmount: number;
  createdBy: number;
}

export interface IUpdateSoldProductDto {
  totalAmount?: number;
}
