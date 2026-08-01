import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useAcceptInvite } from "../hooks/useAcceptInvite";
import {
  acceptInviteSchema,
  type AcceptInviteFormValues,
} from "../schemas/acceptInvite.schema";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { PasswordInput } from "@/shared/components/ui/PasswordInput";
import { ROUTES } from "@/shared/constants/routes";

export const AcceptInviteForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const acceptMutation = useAcceptInvite();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInviteFormValues>({
    resolver: zodResolver(acceptInviteSchema),
  });

  const onSubmit = (data: AcceptInviteFormValues) => {
    if (!token) return;

    acceptMutation.mutate(
      {
        token,
        name: data.name,
        password: data.password,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            navigate(ROUTES.LOGIN);
          }, 1500);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.name?.message}
        {...register("name")}
      />

      <PasswordInput
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button
        type="submit"
        className="w-full"
        loading={acceptMutation.isPending}
        loadingText="Creating Account..."
      >
        Accept Invitation
      </Button>
    </form>
  );
};
