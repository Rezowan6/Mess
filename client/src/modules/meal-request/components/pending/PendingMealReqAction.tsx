import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatDate } from "@/shared/utils/date.utils";
import { Check, Trash2, X } from "lucide-react";
import { useApprovedMealReq } from "../../hooks/useApprovedMealReq";
import { useParmanetDeleteMealReq } from "../../hooks/useParmanetDeleteMealReq";
import { useRejectMealReq } from "../../hooks/useRejectPendingMealReq";
import type { IMyPendingMealReq } from "../../types/mealRequest.types";

export const PendingMealReqAction = ({
  isDeleteDisabled,
  request,
}: {
  isDeleteDisabled: boolean;
  request: IMyPendingMealReq;
}) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const { mutate: approvedMealRequest } = useApprovedMealReq();
  const { mutate: rejectMealRequest } = useRejectMealReq();
  const { mutate: deleteMealRequest } = useParmanetDeleteMealReq();

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
          approvedMealRequest(request.id);
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
          rejectMealRequest(request.id);
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
          deleteMealRequest(request.id);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="flex justify-end items-center gap-2">
      <Button
        variant="success"
        onClick={() => handleApprove(request)}
        leftIcon={<Check size={15} />}
      />

      <Button
        variant="error"
        leftIcon={<X size={15} />}
        onClick={() => handleReject(request)}
      />

      <Button
        unstyled
        disabled={isDeleteDisabled}
        className="flex items-center justify-center"
        leftIcon={<Trash2 size={17} />}
        onClick={() => handleDelete(request)}
      />
    </div>
  );
};
