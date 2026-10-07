import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatDate } from "@/shared/utils/date.utils";
import { Check, Trash2, X } from "lucide-react";
import { useApprovedMealReq } from "../../hooks/useApprovedMealReq";
import { useParmanetDeleteMealReq } from "../../hooks/useParmanetDeleteMealReq";
import { useRejectMealReq } from "../../hooks/useRejectPendingMealReq";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";

export const PendingMealReqAction = ({
  isApprovedDisabled,
  isRejectDisabled,
  isDeleteDisabled,
  request,
}: {
  isApprovedDisabled: boolean;
  isRejectDisabled: boolean;
  isDeleteDisabled: boolean;
  request: IMyPendingMealReq;
}) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const approvedMealRequest = useApprovedMealReq();
  const rejectMealRequest = useRejectMealReq();
  const deleteMealRequest = useParmanetDeleteMealReq();

  const handleApprove = (request: IMyPendingMealReq) => {
    openConfirm({
      title: "Approve Meal Request",
      message: (
        <>
          Are you sure you want to approve{" "}
          <strong className="text-success">{request.requester.name}</strong>
          's meal request for{" "}
          <strong className="text-success">{formatDate(request.date)}</strong>?
        </>
      ),
      onConfirm: async () => {
        setLoading(true);
        try {
          await approvedMealRequest.mutateAsync(request.id);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleReject = (request: IMyPendingMealReq) => {
    openConfirm({
      title: "Reject Meal Request",
      message: (
        <>
          Are you sure you want to reject the meal request of{" "}
          <strong className="text-error">{request.requester.name}</strong> for{" "}
          <strong className="text-error">{formatDate(request.date)}</strong>?
        </>
      ),
      onConfirm: async () => {
        setLoading(true);
        try {
          await rejectMealRequest.mutateAsync(request.id);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleDelete = (request: IMyPendingMealReq) => {
    openConfirm({
      title: "Delete Meal Request",
      message: (
        <>
          Are you sure you want to permanently delete the meal request of{" "}
          <strong className="text-error">{request.requester.name}</strong> for{" "}
          <strong className="text-error">{formatDate(request.date)}</strong>?
        </>
      ),
      onConfirm: async () => {
        setLoading(true);
        try {
          await deleteMealRequest.mutateAsync(request.id);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const actions = [
    {
      key: "approve",
      tooltip: "Approve Request",
      disabledReason: "Future date requests cannot be approved yet",
      disabled: isApprovedDisabled,
      icon: <Check size={15} />,
      style: "text-success",
      onClick: () => handleApprove(request),
    },
    {
      key: "reject",
      tooltip: "Reject Request",
      disabledReason: "Today's requests cannot be rejected",
      disabled: isRejectDisabled,
      style: "text-warning",
      icon: <X size={15} />,
      onClick: () => handleReject(request),
    },
    {
      key: "delete",
      tooltip: "Delete Request",
      disabledReason: "Today's pending requests cannot be deleted",
      disabled: isDeleteDisabled,
      style: "text-error",
      icon: <Trash2 size={17} />,
      onClick: () => handleDelete(request),
    },
  ];

  return (
    <div className="flex items-center gap-6">
      {actions.map(
        ({ key, tooltip, disabledReason, disabled, icon, style, onClick }) => (
          <Button
            key={key}
            unstyled
            disabled={disabled}
            tooltip={disabled ? disabledReason : tooltip}
            leftIcon={icon}
            onClick={onClick}
            className={style}
          />
        ),
      )}
    </div>
  );
};
