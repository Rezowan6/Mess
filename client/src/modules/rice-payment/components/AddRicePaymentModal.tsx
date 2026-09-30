import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { Select } from "@/shared/components/ui/Select";

import { useCreateRicePayment } from "../hooks/useCreateRicePayment";
import {
  RICE_PAYMENT_METHODS,
  type IRicePayment,
  type RicePaymentMethodValue,
} from "../types/ricePayment.types";

import type { IRice } from "@/modules/rice/types/rice.types";
import { formatTaka } from "@/modules/rice/utils/rice.utils";

import { Button } from "@/shared/components/ui/Button";
import { useUpdateRicePayment } from "../hooks/useUpdateRicePayment";
import {
  createRicePaymentSchema,
  type RicePaymentFormValues,
} from "../schemas/ricePayment.schema";

interface AddRicePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  rice: IRice | null;
  /** When provided, the modal works in edit mode */
  payment?: IRicePayment | null;
}

const today = () => new Date().toISOString().slice(0, 10);

export const AddRicePaymentModal = ({
  isOpen,
  onClose,
  rice,
  payment = null,
}: AddRicePaymentModalProps) => {
  const isEdit = payment !== null;
  // In edit mode the current payment amount is available again
  const maxAmount = Number(
    (Number(rice?.remainingDue ?? 0) + Number(payment?.amount ?? 0)).toFixed(2),
  );
  // const remainingDue = Number(rice?.remainingDue ?? 0);

  const schema = useMemo(() => createRicePaymentSchema(maxAmount), [maxAmount]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RicePaymentFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: undefined,
      paymentMethod: "CASH",
      paymentDate: today(),
      note: "",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const create = useCreateRicePayment();
  const update = useUpdateRicePayment();

  const isPending = create.isPending || update.isPending;

  useEffect(() => {
    if (!isOpen) return;
    if (payment) {
      reset({
        amount: Number(payment.amount),
        paymentMethod: payment.paymentMethod,
        paymentDate: String(payment.paymentDate).slice(0, 10),
        note: payment.note ?? "",
      });
    } else {
      reset({
        amount: undefined,
        paymentMethod: "CASH",
        paymentDate: today(),
        note: "",
      });
    }
  }, [isOpen, rice?.id, reset, payment]);

  if (!rice) return null;

  const onSubmit = (values: RicePaymentFormValues) => {
    if (payment) {
      update.mutate(
        { riceId: rice.id, id: payment.id, payload: values },
        { onSuccess: onClose },
      );
      return;
    }
    create.mutate(
      {
        riceId: rice.id,
        ...values,
      },
      {
        onSuccess: onClose,
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Rice Payment" : "Add Rice Payment"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="rounded-lg bg-info/10 p-3 text-sm">
          <div className="flex justify-between">
            <span>Supplier</span>

            <span className="font-medium">{rice.supplierName ?? "—"}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>{isEdit ? "Maximum allowed" : "Remaining due"}</span>

            <span className="font-semibold text-error">
              {formatTaka(maxAmount)}
            </span>
          </div>
        </div>

        <Input
          label="Amount"
          type="number"
          step="0.01"
          placeholder="Enter payment amount"
          error={errors.amount?.message}
          {...register("amount", {
            valueAsNumber: true,
          })}
        />

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
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button type="submit" variant="success" disabled={isPending}>
            {isPending
              ? "Saving..."
              : isEdit
                ? "Update payment"
                : "Save payment"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
