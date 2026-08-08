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
}
