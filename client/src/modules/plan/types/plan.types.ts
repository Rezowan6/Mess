export interface IPlanFeature {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  PlanFeature: {
    value: string | null;
  };
}

export interface IPlan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  monthlyPrice: string;
  yearlyPrice: string;
  currency: string;
  durationDays: number;
  maxMembers: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  features: IPlanFeature[];
}
