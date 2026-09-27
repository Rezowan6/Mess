import { ROUTES } from "@/shared/constants/routes";

export const myProfileRouteTabs = [
  {
    key: "overview",
    label: "Overview",
    path: `${ROUTES.MY_PROFILE}`,
  },
  {
    key: "meals",
    label: "Meals",
    path: `${ROUTES.MY_PROFILE}/meal-history`,
  },
  {
    key: "deposit",
    label: "Deposits",
    path: `${ROUTES.MY_PROFILE}/deposit-history`,
  },
  {
    key: "egg",
    label: "Egg",
    path: `${ROUTES.MY_PROFILE}/eggs-history`,
  },
] as const;
