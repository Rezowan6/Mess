export interface IMealCalculationSummary {
  totalMeal: number;
  deposit: number;
  mealRate: number;
  memberCost: number;
  normalMealCost: number;
  partyCost: number;
  balance: number;
  status: "Received" | "Settled" | "Payable";
}

export interface IMyProfile {
  member: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  };

  summary: IMealCalculationSummary;

  mealSummary: {
    breakfast: number;
    lunch: number;
    dinner: number;
    total: number;
  };

  deposits: {
    id: number;
    amount: number;
    paymentMethod: string;
    createdAt: string;
  }[];

  meals: {
    date: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    guestMeal: string;
  }[];
}
