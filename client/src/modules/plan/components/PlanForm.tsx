import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";

import { Input } from "@/shared/components/ui/Input";
import { PLAN_FORM_CONFIG } from "../configs/planForm.config";
import { useCreatePlan } from "../hooks/useCreatePlan";
import { useUpdatePlan } from "../hooks/useUpdatePlan";
import { planSchema, type PlanFormData } from "../schemas/plan.schema";
import type { IPlan } from "../types/plan.types";

interface Props {
  plan?: IPlan | null;
  onSuccess: () => void;
}

export const PlanForm = ({ plan, onSuccess }: Props) => {
  const isEdit = !!plan;

  const createMutation = useCreatePlan();
  const updateMutation = useUpdatePlan();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: plan?.name ?? "",
      slug: plan?.slug ?? "",
      description: plan?.description ?? "",
      monthlyPrice: plan?.monthlyPrice ?? "",
      yearlyPrice: plan?.yearlyPrice ?? "",
      currency: plan?.currency ?? "BDT",
      durationDays: plan?.durationDays ?? 30,
      maxMembers: plan?.maxMembers ?? 10,
      isActive: plan?.isActive ?? true,
    },
  });

  const onSubmit = async (values: PlanFormData) => {
    if (isEdit) {
      await updateMutation.mutateAsync({
        id: plan.id,
        payload: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }

    onSuccess();
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {Object.entries(PLAN_FORM_CONFIG.fields).map(([key, field]) => {
        if (field.type === "checkbox") {
          return (
            <label key={key} className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                className="checkbox bg-gradient-success"
                {...register(key as keyof PlanFormData)}
              />

              <span className="text-sm font-medium">{field.label}</span>
            </label>
          );
        }

        return (
          <Input
            key={key}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            {...register(key as keyof PlanFormData, {
              valueAsNumber: field.type === "number",
            })}
            error={errors[key as keyof PlanFormData]?.message}
          />
        );
      })}

      <div className="flex justify-end">
        <Button type="button" variant="error" onClick={onSuccess}>
          Cancel
        </Button>
        <Button
          variant="success"
          type="submit"
          loading={isLoading}
          loadingText={isEdit ? "Updating..." : "Creating..."}
        >
          {isEdit ? "Update Plan" : "Create Plan"}
        </Button>
      </div>
    </form>
  );
};
