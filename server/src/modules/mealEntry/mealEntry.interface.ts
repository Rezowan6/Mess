export interface CreateMealEntryDto {
 tenantId:number;
 userId:number;
 mealSessionId:number;
 mealRequestId:number;
 date:Date;
 breakfast:number;
 lunch:number;
 dinner:number;
}

export interface IMealSummary {
  totalMeals: string;
  grandTotalMeals: string;
  totalGuestMeals: string;
  memberCount: string;
}