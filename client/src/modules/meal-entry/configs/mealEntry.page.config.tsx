import { ActionLink } from "@/shared/components/ui/ActionLink";
import { BackButton } from "@/shared/components/ui/BackButton";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";

interface GetMealEntryPageConfigProps {
  pathname: string;
}

export const getMealEntryPageConfig = ({
  pathname,
}: GetMealEntryPageConfigProps) => {
  const { can } = useRBAC();

  const pageConfig = {
    [ROUTES.MEAL_ENTRY]: {
      title: "Meal Entry Management",
      description: "Manage daily meal entries and meal summaries",
      footer: can(PERMISSIONS.MEAL_ENTRY_CREATE) && (
        <ActionLink to={`${ROUTES.MEAL_ENTRY}/today-meals`}>
          View Today Meals
        </ActionLink>
      ),
    },

    [`${ROUTES.MEAL_ENTRY}/today-meals`]: {
      title: "Meal Entry Management",
      description: "Manage daily meal entries and meal summaries",
      footer: <BackButton />,
    },

    [`${ROUTES.MEAL_ENTRY}/history`]: {
      title: "Meal History",
      description: "View all meals for this member.",
      footer: <BackButton />,
    },
  };

  return (
    pageConfig[pathname as keyof typeof pageConfig] ??
    pageConfig[ROUTES.MEAL_ENTRY]
  );
};
