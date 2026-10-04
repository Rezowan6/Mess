export interface IMonthlyCalculationMember {
  userId: number;
  name: string;
  email: string;
  avatar: string | null;
  totalMeal: number;
  normalMealCost: number;
  deposit: number;
  memberCost: number;
  partyCost: number;
  eggCost: number;
  balance: number;
  status: "Payable" | "Received" | "Settled";
}

export interface IMonthlyCalculation {
  totalExpense: number;
  totalPartyExpense: number;
  totalEggCost: number;
  totalMealCost: number;
  totalRiceExpense: number;
  totalSoldProductAmount: number;
  totalDeposit: string;
  grandTotalMeals: number;
  mealRate: number;
  members?: IMonthlyCalculationMember[];
  month: string;
  year: number;
}
