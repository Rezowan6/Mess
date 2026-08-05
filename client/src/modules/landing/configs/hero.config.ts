import { ROUTES } from "@/shared/constants/routes";

export const heroConfig = {
  badge: "Smart Mess Management SaaS",

  title: "Manage Your Mess",

  highlightedTitle: "Easily & Efficiently",

  description:
    "Manage meals, deposits, expenses, members, and monthly calculations from one powerful platform. Make your mess management simple, transparent, and organized.",

  actions: [
    {
      label: "Get Started",
      to: ROUTES.REGISTER,
      variant: "success" as const,
    },
    {
      label: "Login",
      to: ROUTES.LOGIN,
      variant: "primary" as const,
    },
  ],
};
