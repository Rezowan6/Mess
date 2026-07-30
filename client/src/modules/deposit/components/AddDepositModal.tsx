import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateDeposit } from "../hooks/useCreateDeposit";
import { useUpdateDeposit } from "../hooks/useUpdateDeposit";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";

import { PERMISSIONS } from "@/shared/constants/permissions";

import {
  depositSchema,
  type DepositFormValues,
} from "../schemas/deposit.schema";

import { ROUTES } from "@/shared/constants/routes";
import { Link } from "react-router-dom";
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Deposit" : "Add Deposit"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        {depositFields &&
          depositFields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              leftIcon={field.leftIcon && field.leftIcon}
              error={errors[field.name]?.message}
              {...register(field.name, {
                valueAsNumber: field.valueAsNumber,
              })}
            />
          ))}

        <div className="pt-1">
          <Link
            to={`${ROUTES.DEPOSIT}/quick-add`}
            className="text-sm text-info hover:underline"
            onClick={onClose}
          >
            Quick Add
          </Link>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="error" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="success"
            type="submit"
            loading={
              isEdit ? updateMutation.isPending : createMutation.isPending
            }
            loadingText={isEdit ? "Updating..." : "Saving..."}
            permission={
              isEdit ? PERMISSIONS.DEPOSIT_UPDATE : PERMISSIONS.DEPOSIT_CREATE
            }
          >
            {isEdit ? "Update Deposit" : "Save Deposit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
