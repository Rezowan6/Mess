import { ActionLink } from "@/shared/components/ui/ActionLink";
import { BackButton } from "@/shared/components/ui/BackButton";
import { Button } from "@/shared/components/ui/Button";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";

interface GetMealEntryPageConfigProps {
  pathname: string;
}

export const getMealEntryPageConfig = ({
  pathname,
}: GetMealEntryPageConfigProps) => {
  const pageConfig = {
    [ROUTES.MEAL_ENTRY]: {
      title: "Meal Entry Management",
      description: "Manage daily meal entries and meal summaries",

      footer: (
        <ActionLink to={`${ROUTES.MEAL_ENTRY}/today-meals`}>
          View Today Meals
        </ActionLink>
      ),

      action: (
        <Button variant="success" permission={PERMISSIONS.MEAL_ENTRY_CREATE}>
          Add Meal Entry
        </Button>
      ),
    },

    [`${ROUTES.MEAL_ENTRY}/today-meals`]: {
      title: "Meal Entry Management",
      description: "Manage daily meal entries and meal summaries",

      footer: <BackButton />,

      action: (
        <Button variant="success" permission={PERMISSIONS.MEAL_ENTRY_CREATE}>
          Add Meal Entry
        </Button>
      ),
    },

    [`${ROUTES.MEAL_ENTRY}/history`]: {
      title: "Meal History",
      description: "View all meals for this member.",

      action: <BackButton />,
    },
  };

  return (
    pageConfig[pathname as keyof typeof pageConfig] ??
    pageConfig[ROUTES.MEAL_ENTRY]
  );
};
