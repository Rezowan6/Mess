import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { BackButton } from "@/shared/components/ui/BackButton";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useCreateTenant } from "../hooks/useCreateTenant";
import { type ITenantFormData, tenantSchema } from "../schemas/tenant.schema";

export const TenantForm = () => {
  const { mutate, isPending } = useCreateTenant();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ITenantFormData>({
    resolver: zodResolver(tenantSchema),

    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: ITenantFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <Input
        label="Mess name"
        type="name"
        placeholder="Enter your mess name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Button
        type="submit"
        variant="success"
        disabled={isPending}
        className="w-full"
        loading={isPending}
        loadingText="Creating mess..."
      >
        Create Mess
      </Button>

      <BackButton />
    </form>
  );
};
