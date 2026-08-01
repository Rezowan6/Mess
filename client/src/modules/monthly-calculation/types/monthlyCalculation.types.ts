export interface IMonthlyCalculationMember {
  userId: number;
  name: string;
  email: string;
  avatar: string | null;
  totalMeal: number;
  deposit: number;
  memberCost: number;
  balance: number;
  status: "Payable" | "Received" | "Settled";
}

export interface IMonthlyCalculation {
  totalExpense: number;
  totalDeposit: string;
  grandTotalMeals: number;
  mealRate: number;
  members: IMonthlyCalculationMember[];
  month: string;
  year: number;
}
