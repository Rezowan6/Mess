import { CalendarDays } from "lucide-react";
import { useMemo } from "react";

import { getMealSessionLabel } from "@/modules/meal-session/utils/mealSession.utils";
import { Select } from "@/shared/components/ui/Select";
import { useDashboardSessionSelection } from "../../hooks/useDashboardSessionSelection";

export const MealSessionSelector = () => {
  const {
    sessions,
    selection,
    selectSession,
    isLoading,
    isError,
    isEmpty,
    refetch,
  } = useDashboardSessionSelection();

  const options = useMemo(
    () =>
      (sessions ?? []).map((session) => ({
        value: session.id, // unique, তাই id-ই option-এর value
        label: getMealSessionLabel(session),
      })),
    [sessions],
  );

  if (isError) {
    return (
      <div
        role="alert"
        className="flex min-w-56 items-center gap-2 text-sm text-red-600"
      >
        <span>Couldn&apos;t load sessions.</span>
        <button
          type="button"
          onClick={() => void refetch()}
          className="font-medium underline"
        >
          Retry
        </button>
      </div>
    );
  }

  const placeholder = isLoading
    ? "Loading sessions..."
    : isEmpty
      ? "No completed sessions yet"
      : "Select session";

  return (
    <div className="min-w-56" aria-busy={isLoading}>
      <Select
        options={options}
        value={selection?.mealSessionId ?? ""}
        onChange={(event) => {
          const id = Number(event.target.value);
          if (Number.isInteger(id) && id > 0) selectSession(id);
        }}
        placeholder={placeholder}
        disabled={isLoading || isEmpty}
        leftIcon={<CalendarDays size={17} />}
      />
    </div>
  );
};
