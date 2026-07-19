import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  acceptInviteSchema,
  type AcceptInviteFormValues,
} from "../schemas/acceptInvite.schema";

import { useAcceptInvite } from "../hooks/useAcceptInvite";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { PasswordInput } from "@/shared/components/ui/PasswordInput";
import { ROUTES } from "@/shared/constants/routes";

export const AcceptInvitePage = () => {
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
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">Accept Invitation</h1>

          <p className="text-center text-sm text-base-content/70">
            Complete your account setup
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <Input
              placeholder="Enter full Name"
              error={errors.name?.message}
              {...register("name")}
            />
            <PasswordInput
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password")}
            />{" "}
            <PasswordInput
              placeholder="Enter confirm Password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
            <Button
              type="submit"
              fullWidth
              loading={acceptMutation.isPending}
              loadingText="Creating Account..."
            >
              Accept Invitation
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
