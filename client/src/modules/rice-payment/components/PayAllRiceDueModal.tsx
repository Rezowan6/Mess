import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  RICE_PAYMENT_METHODS,
  type RicePaymentMethodValue,
} from "@/modules/rice-payment/types/ricePayment.types";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { Select } from "@/shared/components/ui/Select";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { getLocalDate } from "@/shared/utils/date.utils";

import { useBulkSettleRiceDue } from "../hooks/useBulkSettleRiceDue";

import { formatTaka } from "@/shared/utils/format.utils"; 
import {
  bulkSettleRiceDueSchema,
  type BulkSettleRiceDueFormValues,
} from "../schemas/bulkSettleRiceDue.schema";

interface PayAllRiceDueModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Display only. The backend recalculates the real outstanding balance. */
  totalDue: number;
  /** Display only. Number of purchases with remaining due. */
  dueCount: number;
}

export const PayAllRiceDueModal = ({
  isOpen,
  onClose,
  totalDue,
  dueCount,
}: PayAllRiceDueModalProps) => {
  const hasDue = totalDue > 0 && dueCount > 0;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BulkSettleRiceDueFormValues>({
    resolver: zodResolver(bulkSettleRiceDueSchema),
    defaultValues: {
      paymentMethod: "CASH",
      paymentDate: getLocalDate(),
      note: "",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const bulkSettle = useBulkSettleRiceDue();

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);
  const isConfirmOpen = useConfirmStore((state) => state.isOpen);

  // Reset every time the modal opens
  useEffect(() => {
    if (!isOpen) return;

    reset({
      paymentMethod: "CASH",
      paymentDate: getLocalDate(),
      note: "",
    });
  }, [isOpen, reset]);

  const onSubmit = (values: BulkSettleRiceDueFormValues) => {
    if (!hasDue) return;

    openConfirm({
      title: "Pay All Rice Due",
      message: (
        <>
          Are you sure you want to pay{" "}
          <strong className="text-theme-success">{formatTaka(totalDue)}</strong>{" "}
          across <strong>{dueCount}</strong> rice{" "}
          {dueCount === 1 ? "purchase" : "purchases"} via{" "}
          <strong>{values.paymentMethod}</strong>? This cannot be undone in one
          step.
        </>
      ),
      onConfirm: async () => {
        try {
          setLoading(true);
          await bulkSettle.mutateAsync(values);
          onClose();
        } catch {
          // Error toast is handled by the mutation hook
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Modal
      // Hidden (not unmounted) while the confirm modal is open, so modals never stack
      isOpen={isOpen && !isConfirmOpen}
      onClose={onClose}
      title="Pay All Rice Due"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="rounded-theme-md bg-theme-info-soft p-3 text-sm">
          <div className="flex justify-between text-theme-text-muted">
            <span>Total outstanding due</span>

            <span className="font-semibold text-theme-danger">
              {formatTaka(totalDue)}
            </span>
          </div>

          <div className="mt-2 flex justify-between text-theme-text-muted">
            <span>Purchases with due</span>

            <span className="font-medium text-theme-text">{dueCount}</span>
          </div>
        </div>

        <div className="rounded-theme-md bg-theme-warning-soft p-3 text-sm text-theme-warning">
          This will settle <strong>all outstanding rice dues</strong> for the
          current meal session. A separate payment will be recorded for each
          purchase.
        </div>

        <Select
          label="Payment Method"
          options={RICE_PAYMENT_METHODS.map((method) => ({
            label: method,
            value: method,
          }))}
          placeholder="Select payment method"
          value={paymentMethod}
          error={errors.paymentMethod?.message}
          onChange={(event) =>
            setValue(
              "paymentMethod",
              event.target.value as RicePaymentMethodValue,
              {
                shouldValidate: true,
                shouldDirty: true,
              },
            )
          }
        />

        <Input
          label="Payment Date"
          type="date"
          error={errors.paymentDate?.message}
          {...register("paymentDate")}
        />

        <Input
          label="Note (optional)"
          placeholder="Enter payment note"
          error={errors.note?.message}
          {...register("note")}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="error"
            onClick={onClose}
            disabled={bulkSettle.isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="success"
            disabled={!hasDue || bulkSettle.isPending}
          >
            {bulkSettle.isPending ? "Saving..." : "Pay All Due"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
