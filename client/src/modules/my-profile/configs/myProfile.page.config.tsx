import { ROUTES } from "@/shared/constants/routes";

export const myProfilePageConfig = {
  [ROUTES.MY_PROFILE]: {
    title: "My Profile",
    description: "View your meal, deposit and balance information.",
  },

  [`${ROUTES.MY_PROFILE}/meal-history`]: {
    title: "My Meal History",
    description: "View your meal history and meal details.",
  },

  [`${ROUTES.MY_PROFILE}/deposit-history`]: {
    title: "My Deposit History",
    description: "View your deposit history and payment details.",
  },

  [`${ROUTES.MY_PROFILE}/eggs-history`]: {
    title: "Egg History",
    description: "View your egg consumption and history.",
  },
} as const;

export const getMyProfilePageConfig = (pathname: string) => {
  return (
    myProfilePageConfig[pathname as keyof typeof myProfilePageConfig] ??
    myProfilePageConfig[ROUTES.MY_PROFILE]
  );
};
