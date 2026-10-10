import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate } from "@/shared/utils/date.utils";

import { useParmanetDeleteMealReq } from "../../hooks/useParmanetDeleteMealReq";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";

interface Props {
  request: IMyPendingMealReq;
  isDeleteDisabled: boolean;
}

export const MealRequestHistoryAction = ({
  request,
  isDeleteDisabled,
}: Props) => {
  const deleteMutation = useParmanetDeleteMealReq();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to permanently delete this meal request?"
      details={[
        {
          label: "Member",
          value: request.requester.name,
          highlight: true,
        },
        {
          label: "Date",
          value: formatDate(request.date),
        },
      ]}
    />
  );

  return (
    <RecordActions
      deletePermission={PERMISSIONS.MEAL_REQUEST_CREATE}
      onDelete={() => deleteMutation.mutateAsync(request.id)}
      deleteTitle="Delete Meal Request"
      deleteMessage={deleteMsg}
      locked={isDeleteDisabled}
    />
  );
};
