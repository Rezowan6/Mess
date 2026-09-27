import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCreateSoldProduct } from "@/modules/sold-product/hooks/useCreateSoldProduct";
import { useUpdateSoldProduct } from "@/modules/sold-product/hooks/useUpdateSoldProduct";
import type {
  ICreateSoldProductDto,
  IUpdateSoldProductDto,
} from "@/modules/sold-product/types/soldProduct.types";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";
import { PERMISSIONS } from "@/shared/constants/permissions";
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Update Sold Product" : "Add Sold Product"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
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

        <p className="text-sm text-base-content/60">
          Enter the total amount received from sold products for this meal
          session.
        </p>

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
              isEdit
                ? PERMISSIONS.MEAL_SETTING_UPDATE
                : PERMISSIONS.MEAL_SETTING_CREATE
            }
          >
            {isEdit ? "Update Sold Product" : "Save Sold Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
