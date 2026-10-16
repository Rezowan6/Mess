import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { useCreatePaymentMethod } from "../hooks/useCreatePaymentMethod";
import { useUpdatePaymentMethod } from "../hooks/useUpdatePaymentMethod";
import {
  getPaymentMethodSchema,
  PAYMENT_PROVIDER_OPTIONS,
  type PaymentMethodFormValues,
} from "../schemas/paymentMethod.schema";
import type { IPaymentMethod } from "../types/paymentMethod.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod?: IPaymentMethod | null; // provided = edit mode
}

const DEFAULT_VALUES: PaymentMethodFormValues = {
  provider: "BKASH",
  accountName: "",
  accountNumber: "",
  isDefault: false,
};

export const AddPaymentMethodModal = ({
  isOpen,
  onClose,
  paymentMethod,
}: Props) => {
  const isEdit = Boolean(paymentMethod);

  const { can } = useRBAC();
  const createMutation = useCreatePaymentMethod();
  const updateMutation = useUpdatePaymentMethod();
  const schema = useMemo(() => getPaymentMethodSchema(isEdit), [isEdit]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PaymentMethodFormValues, unknown, PaymentMethodFormValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  // Fill the form every time the modal opens (create: empty, edit: existing data)
  useEffect(() => {
    if (!isOpen) return;

    reset(
      paymentMethod
        ? {
            provider: paymentMethod.provider,
            accountName: paymentMethod.accountName,
            accountNumber: "",
            isDefault: paymentMethod.isDefault,
          }
        : DEFAULT_VALUES,
    );
  }, [isOpen, paymentMethod, reset]);

  const permission = isEdit
    ? PERMISSIONS.PAYMENT_METHOD_UPDATE
    : PERMISSIONS.PAYMENT_METHOD_CREATE;

  // All hooks are above this line, so the early return is safe
  if (!can(permission)) {
    return null;
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: PaymentMethodFormValues) => {
    if (isEdit && paymentMethod) {
      updateMutation.mutate(
        {
          id: Number(paymentMethod.id),
          payload: {
            accountName: data.accountName,
            accountNumber: data.accountNumber,
            isDefault: data.isDefault,
          },
        },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  return (
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Payment Method" : "Add Payment Method"}
      isEdit={isEdit}
      isPending={isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={permission}
    >
      <Controller
        name="provider"
        control={control}
        render={({ field }) => (
          <Select
            label="Provider"
            options={PAYMENT_PROVIDER_OPTIONS}
            placeholder="Select provider"
            value={field.value}
            disabled={isEdit}
            error={errors.provider?.message}
            onChange={(event) => {
              field.onChange(event.target.value);

              // The number rule depends on the provider, so validate again
              if (getValues("accountNumber")) {
                void trigger("accountNumber");
              }
            }}
          />
        )}
      />

      <Input
        label="Account Name"
        placeholder="Enter account name"
        value={paymentMethod?.maskedAccountNumber ?? ""}
        autoComplete="off"
        error={errors.accountName?.message}
        {...register("accountName")}
      />

      {isEdit ? (
        <Input
          label="Account Number"
          value={paymentMethod?.maskedAccountNumber ?? ""}
          disabled
          readOnly
        />
      ) : (
        <Input
          label="Account Number"
          placeholder="01XXXXXXXXX"
          inputMode="numeric"
          autoComplete="off"
          error={errors.accountNumber?.message}
          {...register("accountNumber")}
        />
      )}

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-theme-border accent-theme-brand"
          disabled={isEdit && paymentMethod?.isActive === false}
          {...register("isDefault")}
        />
        <span className="text-sm text-theme-text">
          Set as default payment method
        </span>
      </label>
    </RecordFormModal>
  );
};
