import { useEffect, useMemo } from "react";

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

  /*
   * Resolve current session.
   *
   * Priority:
   * 1. User selected session
   * 2. Latest completed session
   */
  const selectedSession = useMemo(() => {
    if (!sessions?.length) {
      return null;
    }

    const storedSession = sessions.find(
      (session) => session.id === storedSessionId,
    );

    return storedSession ?? sessions[0];
  }, [sessions, storedSessionId]);

  /*
   * If no session was explicitly selected,
   * persist the default/latest session into Zustand.
   *
   * This makes Axios interceptor and UI use
   * the exact same session context.
   */
  useEffect(() => {
    if (!selectedSession) {
      return;
    }

    if (storedSessionId !== selectedSession.id) {
      selectSession(selectedSession.id);
    }
  }, [selectedSession, storedSessionId, selectSession]);

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

  const isSelectionUnavailable =
    storedSessionId !== null &&
    sessions !== undefined &&
    sessions.length > 0 &&
    !sessions.some((session) => session.id === storedSessionId);

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
