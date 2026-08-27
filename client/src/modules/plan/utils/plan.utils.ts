import type { IPlan } from "../types/plan.types";

export const isPopularPlan = (plan: IPlan): boolean => {
  return plan.name === "Standard";
};
