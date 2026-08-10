import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/Button";
import { Select } from "@/shared/components/ui/Select";

import { usePlans } from "@/modules/plan/hooks/usePlans";
import { useCreateSubscription } from "../hooks/useCreateSubscription";
import {
  subscriptionSchema,
  type SubscriptionFormValues,
} from "../schemas/subscription.schema";

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const SubscriptionPurchaseForm = ({ onSuccess, onCancel }: Props) => {
  const createMutation = useCreateSubscription();
  const { data, isPending } = usePlans();

  const plans = data?.data ?? [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      planId: undefined,
    },
  });

  const onSubmit = (data: SubscriptionFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Select
        label="Select Plan"
        options={plans.map((plan) => ({
          label: `${plan.name} - ৳${plan.monthlyPrice}`,
          value: String(plan.id),
        }))}
        error={errors.planId?.message}
        disabled={isPending}
        {...register("planId", {
          setValueAs: (value) => Number(value),
        })}
      />

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="error" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          variant="success"
          loading={createMutation.isPending}
          loadingText="Creating..."
          disabled={isPending}
        >
          Continue
        </Button>
      </div>
    </form>
  );
};
