
export interface ICreatePlanInput {
  name: string;
  slug: string;
  description: string | null;

  monthlyPrice: string;
  yearlyPrice: string;
  currency: string;

  durationDays: number;
  maxMembers: number;

  isActive?: boolean;
}

export interface IUpdatePlanInput {
  name?: string;
  slug?: string;
  description?: string | null;

  monthlyPrice?: string;
  yearlyPrice?: string;
  currency?: string;

  durationDays?: number;
  maxMembers?: number;

  isActive?: boolean;
}
