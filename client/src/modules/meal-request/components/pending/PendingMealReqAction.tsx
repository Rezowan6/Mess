import { Check, Trash2, X } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/shared/components/ui/Button";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatDate } from "@/shared/utils/date.utils";

import { useApprovedMealReq } from "../../hooks/useApprovedMealReq";
import { useParmanetDeleteMealReq } from "../../hooks/useParmanetDeleteMealReq";
import { useRejectMealReq } from "../../hooks/useRejectPendingMealReq";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";

interface Props {
  isApprovedDisabled: boolean;
  isRejectDisabled: boolean;
  isDeleteDisabled: boolean;
  request: IMyPendingMealReq;
}

export const PendingMealReqAction = ({
  isApprovedDisabled,
  isRejectDisabled,
  isDeleteDisabled,
  request,
}: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const approveMutation = useApprovedMealReq();
  const rejectMutation = useRejectMealReq();
  const deleteMutation = useParmanetDeleteMealReq();

  const confirmAction = (
    title: string,
    message: ReactNode,
    action: () => Promise<unknown>,
  ) => {
    openConfirm({
      title,
      message,
      onConfirm: async () => {
        setLoading(true);
        try {
          await action();
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const buildMessage = (description: string) => (
    <RecordDeleteMessage
      description={description}
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

  const actions = [
    {
      key: "approve",
      disabledReason: "Future date requests cannot be approved yet",
      disabled: isApprovedDisabled,
      icon: <Check size={15} />,
      style: "text-theme-success",
      onClick: () =>
        confirmAction(
          "Approve Meal Request",
          buildMessage("Are you sure you want to approve this meal request?"),
          () => approveMutation.mutateAsync(request.id),
        ),
    },
    {
      key: "reject",
      disabledReason: "Today's requests cannot be rejected",
      disabled: isRejectDisabled,
      icon: <X size={15} />,
      style: "text-theme-warning",
      onClick: () =>
        confirmAction(
          "Reject Meal Request",
          buildMessage("Are you sure you want to reject this meal request?"),
          () => rejectMutation.mutateAsync(request.id),
        ),
    },
    {
      key: "delete",
      disabledReason: "Today's pending requests cannot be deleted",
      disabled: isDeleteDisabled,
      icon: <Trash2 size={17} />,
      style: "text-theme-danger",
      onClick: () =>
        confirmAction(
          "Delete Meal Request",
          buildMessage(
            "Are you sure you want to permanently delete this meal request?",
          ),
          () => deleteMutation.mutateAsync(request.id),
        ),
    },
  ];

  return (
    <div className="flex items-center gap-6">
      {actions.map(
        ({ key, disabledReason, disabled, icon, style, onClick }) => (
          <Button
            key={key}
            unstyled
            disabled={disabled}
            tooltip={disabled ? disabledReason : undefined}
            leftIcon={icon}
            onClick={onClick}
            className={style}
          />
        ),
      )}
    </div>
  );
};
