import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Modal } from "@/shared/components/ui/Modal";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { featureFields } from "../configs/featureFields";
import { useCreateFeature } from "../hooks/useCreateFeature";
import { useUpdateFeature } from "../hooks/useUpdateFeature";
import {
  featureSchema,
  type FeatureFormValues,
} from "../schemas/feature.schema";
import type { IFeature } from "../types/feature.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  feature?: IFeature;
}

export const FeatureFormModal = ({ isOpen, onClose, feature }: Props) => {
  const { can } = useRBAC();

  const createMutation = useCreateFeature();
  const updateMutation = useUpdateFeature();

  const isEdit = !!feature;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeatureFormValues>({
    resolver: zodResolver(featureSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (feature) {
      reset({
        name: feature.name,
        slug: feature.slug,
        description: feature.description ?? "",
        isActive: feature.isActive,
      });
    } else {
      reset({
        name: "",
        slug: "",
        description: "",
        isActive: true,
      });
    }
  }, [feature, reset]);

  if (!can(isEdit ? PERMISSIONS.FEATURE_UPDATE : PERMISSIONS.FEATURE_CREATE)) {
    return null;
  }

  const onSubmit = (data: FeatureFormValues) => {
    if (isEdit) {
      updateMutation.mutate(
        {
          id: feature.id,
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
      title={isEdit ? "Update Feature" : "Add Feature"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {featureFields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            leftIcon={field.leftIcon}
            error={errors[field.name]?.message}
            {...register(field.name)}
          />
        ))}

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            className="checkbox bg-success"
            {...register("isActive")}
          />

          <span className="text-sm font-medium">Active</span>
        </label>

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
              isEdit ? PERMISSIONS.FEATURE_UPDATE : PERMISSIONS.FEATURE_CREATE
            }
          >
            {isEdit ? "Update Feature" : "Save Feature"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
