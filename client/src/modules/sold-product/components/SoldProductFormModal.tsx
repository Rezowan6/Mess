import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreateSoldProduct } from "@/modules/sold-product/hooks/useCreateSoldProduct";
import { useUpdateSoldProduct } from "@/modules/sold-product/hooks/useUpdateSoldProduct";
import type {
  ICreateSoldProductDto,
  IUpdateSoldProductDto,
} from "@/modules/sold-product/types/soldProduct.types";

import { Input } from "@/shared/components/ui/Input";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordFormModal } from "@/shared/forms/RecordFormModal";
import { useRBAC } from "@/shared/hooks/useRBAC";
import {
  soldProductSchema,
  type SoldProductFormValues,
} from "../schemas/soldProduct.schema";

interface SoldProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  soldProduct?: {
    id: number;
    totalAmount: number | string;
  };
}

export const SoldProductFormModal = ({
  isOpen,
  onClose,
  soldProduct,
}: SoldProductFormModalProps) => {
  const { can } = useRBAC();

  const createMutation = useCreateSoldProduct();
  const updateMutation = useUpdateSoldProduct();

  const isEdit = !!soldProduct;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SoldProductFormValues>({
    resolver: zodResolver(soldProductSchema),

    defaultValues: {
      totalAmount: undefined,
    },
  });

  useEffect(() => {
    if (soldProduct) {
      reset({
        totalAmount: Number(soldProduct.totalAmount),
      });
    } else {
      reset({
        totalAmount: undefined,
      });
    }
  }, [soldProduct, reset]);

  if (
    !can(
      isEdit
        ? PERMISSIONS.MEAL_SETTING_UPDATE
        : PERMISSIONS.MEAL_SETTING_CREATE,
    )
  ) {
    return null;
  }

  const onSubmit = (data: SoldProductFormValues) => {
    if (isEdit) {
      const payload: IUpdateSoldProductDto = {
        totalAmount: data.totalAmount,
      };

      updateMutation.mutate(payload, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });

      return;
    }

    const payload: ICreateSoldProductDto = {
      totalAmount: data.totalAmount,
    };

    createMutation.mutate(payload, {
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
      title={isEdit ? "Update Sold Product" : "Add Sold Product"}
      isEdit={isEdit}
      isPending={isEdit ? updateMutation.isPending : createMutation.isPending}
      onSubmit={handleSubmit(onSubmit)}
      permission={
        isEdit
          ? PERMISSIONS.MEAL_SETTING_UPDATE
          : PERMISSIONS.MEAL_SETTING_CREATE
      }
    >
      <Input
        label="Total Sold Product Amount"
        type="number"
        step="0.01"
        min="0.01"
        placeholder="Enter total sold product amount"
        error={errors.totalAmount?.message}
        {...register("totalAmount", {
          valueAsNumber: true,
        })}
      />

      <p className="text-sm text-theme-text-muted">
        Enter the total amount received from sold products for this meal
        session.
      </p>
    </RecordFormModal>
  );
};
