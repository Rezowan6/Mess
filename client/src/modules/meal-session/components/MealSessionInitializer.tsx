import type { ReactNode } from "react";

import { useDashboardSessionSelection } from "@/modules/dashboard/hooks/useDashboardSessionSelection";
import { useDashboardSessionStore } from "@/modules/dashboard/store/dashboardSession.store";
import { ErrorState } from "@/shared/components/feedback/ErrorState"; // adjust path
import { PageLoader } from "@/shared/components/feedback/PageLoader";

interface MealSessionInitializerProps {
  children: ReactNode;
}

export const MealSessionInitializer = ({
  children,
}: MealSessionInitializerProps) => {
  const { selection, isLoading, isError, refetch } =
    useDashboardSessionSelection();

  const storedSessionId = useDashboardSessionStore(
    (state) => state.mealSessionId,
  );

  if (isLoading) return <PageLoader />;

  if (isError) {
    return (
      <ErrorState
        title="Failed to initialize the meal session"
        description="We couldn't load the meal sessions. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  // Wait until the session id is in the store, so no request goes without it
  if (selection && storedSessionId !== selection.mealSessionId) {
    return <PageLoader />;
  }

  return <>{children}</>;
};
