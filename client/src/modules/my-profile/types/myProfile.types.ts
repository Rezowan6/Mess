export interface IMealCalculationSummary {
  totalMeal: number;
  deposit: number;
  mealRate: number;
  memberCost: number;
  normalMealCost: number;
  partyCost: number;
  balance: number;
  eggCost: number;
  status: "Received" | "Settled" | "Payable";
}

export interface mealSummary {
  breakfast: number;
  lunch: number;
  dinner: number;
  total: number;
}

export interface IMyProfile {
  member: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  };

  summary: IMealCalculationSummary;

  mealSummary: mealSummary;

  eggSummary: {
    totalEgg: number;
    eggRate: number;
    eggCost: number;
  };

  deposits: {
    id: number;
    amount: number;
    paymentMethod: string;
    createdAt: string;
  }[];

  eggs: {
    id: number;
    tenantId: number;
    mealSessionId: number;
    memberId: number;
    createdBy: number;
    eggDate: string;
    quantity: number | string;
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
