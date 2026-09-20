import { useMemo } from "react";

import { useCompletedMealSessions } from "@/modules/meal-session/hooks/useCompletedMealSessions";
import { useDashboardSessionStore } from "../store/dashboardSession.store";

export const useSelectedMealSession = () => {
  const { data: sessions, isLoading, isError } = useCompletedMealSessions();

  const mealSessionId = useDashboardSessionStore(
    (state) => state.mealSessionId,
  );

  const selectedSession = useMemo(() => {
    if (!sessions?.length) {
      return null;
    }

    return (
      sessions.find((session) => session.id === mealSessionId) ?? sessions[0]
    );
  }, [sessions, mealSessionId]);

  return {
    session: selectedSession,
    mealSessionId: selectedSession?.id,
    status: selectedSession?.status,
    isLoading,
    isError,
  };
};
