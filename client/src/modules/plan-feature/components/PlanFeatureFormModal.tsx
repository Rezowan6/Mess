import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { useCreatePlanFeature } from "../hooks/useCreatePlanFeature";
import { useUpdatePlanFeature } from "../hooks/useUpdatePlanFeature";
import {
  planFeatureSchema,
  type PlanFeatureFormValues,
} from "../schemas/planFeature.schema";
import type { IPlanFeature } from "../types/planFeature.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  planFeature?: IPlanFeature;
  planId?: number;
  featureId?: number;
}

export const PlanFeatureFormModal = ({
  isOpen,
  onClose,
  planFeature,
  planId,
  featureId,
}: Props) => {
  const { can } = useRBAC();

  const createMutation = useCreatePlanFeature();
  const updateMutation = useUpdatePlanFeature();

  const isEdit = !!planFeature;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PlanFeatureFormValues>({
    resolver: zodResolver(planFeatureSchema),
    defaultValues: {
      planId: planId ?? undefined,
      featureId: featureId ?? undefined,
      value: "",
    },
  });

  useEffect(() => {
    if (planFeature) {
      reset({
        planId: planFeature.planId,
        featureId: planFeature.featureId,
        value: planFeature.value ?? "",
      });
    } else {
      reset({
        planId: planId ?? undefined,
        featureId: featureId ?? undefined,
        value: "",
      });
    }
  }, [planFeature, planId, featureId, reset]);

  if (
    !can(
      isEdit
        ? PERMISSIONS.PLAN_FEATURE_UPDATE
        : PERMISSIONS.PLAN_FEATURE_CREATE,
    )
  ) {
    return null;
  }

  const onSubmit = (data: PlanFeatureFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: planFeature.id,
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
      title={isEdit ? "Update Plan Feature" : "Add Plan Feature"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          type="number"
          label="Plan ID"
          placeholder="Enter plan ID"
          error={errors.planId?.message}
          {...register("planId", { valueAsNumber: true })}
        />

        <Input
          type="number"
          label="Feature ID"
          placeholder="Enter feature ID"
          error={errors.featureId?.message}
          {...register("featureId", { valueAsNumber: true })}
        />

        <Input
          label="Value"
          placeholder="Enter feature value"
          error={errors.value?.message}
          {...register("value")}
        />

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
                ? PERMISSIONS.PLAN_FEATURE_UPDATE
                : PERMISSIONS.PLAN_FEATURE_CREATE
            }
          >
            {isEdit ? "Update Plan Feature" : "Save Plan Feature"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
