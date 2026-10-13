import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate, isRecordLocked } from "@/shared/utils/date.utils";

import { useDeleteMealEntry } from "../hooks/useDeleteMealEntry";
import type { IMealEntry } from "../types/mealEntry.types";

interface Props {
  meal: IMealEntry;
  onEdit: (meal: IMealEntry) => void;
}

export const MealEntryActions = ({ meal, onEdit }: Props) => {
  const deleteMutation = useDeleteMealEntry();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this meal entry?"
      details={[
        {
          label: "Member",
          value: meal.user?.name ?? "Unknown",
          highlight: true,
        },
        {
          label: "Date",
          value: formatDate(meal.date),
        },
        {
          label: "Breakfast",
          value: meal.breakfast,
        },
        {
          label: "Lunch",
          value: meal.lunch,
        },
        {
          label: "Dinner",
          value: meal.dinner,
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.MEAL_ENTRY_UPDATE}
      locked={isRecordLocked(meal.createdAt)}
      onEdit={() => onEdit(meal)}
      onDelete={() => deleteMutation.mutateAsync(meal.id)}
      deleteTitle="Delete Meal Entry"
      deleteMessage={deleteMsg}
    />
  );
};