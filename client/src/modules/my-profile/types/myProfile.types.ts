export interface IMyProfile {
  member: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  };

  summary: {
    totalMeal: number;
    deposit: number;
    mealRate: number;
    memberCost: number;
    balance: number;
    status: "Received" | "Settled" | "Payable";
  };
}
