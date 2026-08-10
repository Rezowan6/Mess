import type { IPlan } from "@/modules/plan/types/plan.types";

export type SubscriptionStatusType =
  "active" | "cancelled" | "expired" | "pending";

export interface ISubscription {
  id: number;
  tenantId: number;
  planId: number;
  status: SubscriptionStatusType;
  amount: string;
  isFreeTrial: boolean;
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  plan?: IPlan
}
