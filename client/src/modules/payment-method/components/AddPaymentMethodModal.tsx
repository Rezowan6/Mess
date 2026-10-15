import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreatePaymentMethod } from "../hooks/useCreatePaymentMethod";
import {
  paymentMethodSchema,
  type PaymentMethodFormValues,
} from "../schemas/paymentMethod.schema";

import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { useRBAC } from "@/shared/hooks/useRBAC";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPaymentMethodModal = ({ isOpen, onClose }: Props) => {
  const { can } = useRBAC();
  const createMutation = useCreatePaymentMethod();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      provider: "BKASH",
      accountName: "",
      accountNumber: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset({
        provider: "BKASH",
        accountName: "",
        accountNumber: "",
        isDefault: false,
      });
    }
  }, [isOpen, reset]);

  if (!can(PERMISSIONS.PAYMENT_METHOD_CREATE)) {
    return null;
  }

  const onSubmit = (data: PaymentMethodFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Payment Method"
      isEdit={false}
      isPending={createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={PERMISSIONS.PAYMENT_METHOD_CREATE}
    >
      <Select
        label="Provider"
        options={[
          { label: "bKash", value: "BKASH" },
          { label: "Nagad", value: "NAGAD" },
          { label: "Rocket", value: "ROCKET" },
          { label: "Bank", value: "BANK" },
        ]}
        placeholder="Select provider"
        value={watch("provider")}
        error={errors.provider?.message}
        onChange={(event) =>
          setValue(
            "provider",
            event.target.value as PaymentMethodFormValues["provider"],
            {
              shouldValidate: true,
              shouldDirty: true,
            },
          )
        }
      />

      <Input
        label="Account Name"
        placeholder="Enter account name"
        error={errors.accountName?.message}
        {...register("accountName")}
      />

      <Input
        label="Account Number"
        placeholder="Enter account number"
        error={errors.accountNumber?.message}
        {...register("accountNumber")}
      />

      <label className="label cursor-pointer justify-start gap-3">
        <input
          type="checkbox"
          className="checkbox"
          {...register("isDefault")}
        />
        <span className="label-text">Set as default payment method</span>
      </label>
    </RecordFormModal>
  );
};
