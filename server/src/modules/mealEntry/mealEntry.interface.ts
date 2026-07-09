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