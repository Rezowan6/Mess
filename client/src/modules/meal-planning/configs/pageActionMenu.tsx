import { Calculator, Calendar, RefreshCw, Settings, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

export const pageActionMenu = (refetch: () => unknown, isFetching = false) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Refresh Planning",
      icon: RefreshCw,
      onClick: () => {
        // Ignore extra clicks while a refresh is already running
        if (!isFetching) refetch();
      },
    },
    {
      label: "Pending Meals",
      icon: Calendar,
      onClick: () => {
        navigate(`${ROUTES.MEAL_REQUEST}/pending-meals`);
      },
    },
    {
      label: "Meal Settings",
      icon: Settings,
      onClick: () => {
        navigate(`${ROUTES.SETTINGS}/meal-setting`);
      },
    },
    {
      label: "Meal Entry",
      icon: Users,
      onClick: () => {
        navigate(ROUTES.MEAL_ENTRY);
      },
    },
    {
      label: "Monthly Calculation",
      icon: Calculator,
      onClick: () => {
        navigate(ROUTES.MONTHLY_CALCULATION);
      },
    },
  ];

  return menuItems;
};
