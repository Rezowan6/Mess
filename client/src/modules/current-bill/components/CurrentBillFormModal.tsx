import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { Input } from "@/shared/components/ui/Input";

import { PERMISSIONS } from "@/shared/constants/permissions";

import { MemberSelector } from "@/shared/components/ui/MemberSelector";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { currentBillFields } from "../configs/currentBillFields.config";
import { useCreateCurrentBill } from "../hooks/useCreateCurrentBill";
import { useUpdateCurrentBill } from "../hooks/useUpdateCurrentBill";
import {
  currentBillSchema,
  type CurrentBillFormValues,
} from "../schemas/currentBill.schema";
import type { ICurrentBill } from "../types/currentBill.types";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  currentBill?: ICurrentBill;
}

export const CurrentBillFormModal = ({
  isOpen,
  onClose,
  currentBill,
}: Props) => {
  const { can } = useRBAC();

  const createMutation = useCreateCurrentBill();

  const updateMutation = useUpdateCurrentBill();

  const isEdit = !!currentBill;

  const methods = useForm<CurrentBillFormValues>({
    resolver: zodResolver(currentBillSchema),
    defaultValues: {
      userId: undefined,
      amount: undefined,
      paymentMethod: "",
    },
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (currentBill) {
      reset({
        userId: currentBill.userId,
        amount: currentBill.amount,
        paymentMethod: currentBill.paymentMethod,
      });
    } else {
      reset({
        userId: undefined,
        amount: undefined,
        paymentMethod: "",
      });
    }
  }, [currentBill, reset]);

  if (!can(isEdit ? PERMISSIONS.DEPOSIT_UPDATE : PERMISSIONS.DEPOSIT_CREATE)) {
    return null;
  }

  const onSubmit = (data: CurrentBillFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: currentBill.id,
          payload: data,
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
    <FormProvider {...methods}>
      <RecordFormModal
        isOpen={isOpen}
        onClose={onClose}
        title={isEdit ? "Update Current-bill" : "Add Current-bill"}
        isEdit={isEdit}
        isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
        onSubmit={handleSubmit(onSubmit)}
        permission={
          isEdit ? PERMISSIONS.DEPOSIT_UPDATE : PERMISSIONS.DEPOSIT_CREATE
        }
      >
        {currentBillFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            leftIcon={field.leftIcon}
            error={errors[field.name]?.message}
            {...register(field.name, {
              valueAsNumber: field.valueAsNumber,
            })}
          />
        ))}

        <MemberSelector<CurrentBillFormValues>
          name="userId"
          label="Select Member"
        />
      </RecordFormModal>
    </FormProvider>
  );
};
