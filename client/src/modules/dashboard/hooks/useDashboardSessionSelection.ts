import { useMemo } from "react";

import { useCompletedMealSessions } from "@/modules/meal-session/hooks/useCompletedMealSessions";
import type { IMealSessionSelection } from "@/modules/meal-session/types/mealSession.types";

import { useDashboardSessionStore } from "../store/dashboardSession.store";

export const useDashboardSessionSelection = () => {
  const {
    data: sessions,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useCompletedMealSessions();

  const storedSessionId = useDashboardSessionStore(
    (state) => state.mealSessionId,
  );

  const selectSession = useDashboardSessionStore((state) => state.select);

  const { selectedSession, isSelectionUnavailable } = useMemo(() => {
    if (!sessions?.length) {
      return {
        selectedSession: null,
        isSelectionUnavailable: false,
      };
    }

    const stored = sessions.find((session) => session.id === storedSessionId);

    return {
      selectedSession: stored ?? sessions[0] ?? null,

      isSelectionUnavailable: storedSessionId !== null && !stored,
    };
  }, [sessions, storedSessionId]);

  const selection = useMemo<IMealSessionSelection | null>(
    () =>
      selectedSession
        ? {
            month: selectedSession.month,
            year: selectedSession.year,
            mealSessionId: selectedSession.id,
          }
        : null,
    [selectedSession],
  );

  return {
    sessions,

    selection,

    mealSessionId: selection?.mealSessionId ?? undefined,

    month: selection?.month ?? null,

    year: selection?.year ?? null,

    selectSession,

    isLoading,

    isError: isError && sessions === undefined,

    isEmpty: isSuccess && sessions?.length === 0,

    isSelectionUnavailable,

    refetch,
  };
};
