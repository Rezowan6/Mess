import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateDeposit } from "../hooks/useCreateDeposit";
import { useUpdateDeposit } from "../hooks/useUpdateDeposit";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { Input } from "@/shared/components/ui/Input";

import { PERMISSIONS } from "@/shared/constants/permissions";

import {
  depositSchema,
  type DepositFormValues,
} from "../schemas/deposit.schema";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { ROUTES } from "@/shared/constants/routes";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { depositFields } from "../configs/depositFields";
import type { IDeposit } from "../types/deposit.types";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  deposit?: IDeposit;
}

export const AddDepositModal = ({ isOpen, onClose, deposit }: Props) => {
  const { can } = useRBAC();

  const createMutation = useCreateDeposit();

  const updateMutation = useUpdateDeposit();

  const isEdit = !!deposit;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),

    defaultValues: {
      memberId: undefined,
      amount: undefined,
      paymentMethod: "",
      note: "",
    },
  });

  useEffect(() => {
    if (deposit) {
      reset({
        memberId: deposit.memberId,
        amount: deposit.amount,
        paymentMethod: deposit.paymentMethod,
        note: deposit.note ?? "",
      });
    } else {
      reset({
        memberId: undefined,
        amount: undefined,
        paymentMethod: "",
        note: "",
      });
    }
  }, [deposit, reset]);

  if (!can(isEdit ? PERMISSIONS.DEPOSIT_UPDATE : PERMISSIONS.DEPOSIT_CREATE)) {
    return null;
  }

  const onSubmit = (data: DepositFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: deposit.id,
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
    <RecordFormModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Deposit" : "Add Deposit"}
      isEdit={isEdit}
      isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={
        isEdit ? PERMISSIONS.DEPOSIT_UPDATE : PERMISSIONS.DEPOSIT_CREATE
      }
    >
      {depositFields.map((field) => (
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

      <ActionLink to={`${ROUTES.DEPOSIT}/quick-add`}>Quick Add</ActionLink>
    </RecordFormModal>
  );
};
