import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "../hooks/useLogin";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { PasswordInput } from "@/shared/components/ui/PasswordInput";
import { ROUTES } from "@/shared/constants/routes";
import { loginSchema, type ILoginFormData } from "../schemas/auth.schema";

export const LoginForm = () => {
  const { mutate, isPending } = useLogin();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginFormData) => {
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
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Password */}
      <div>
        <label className="label">
          <span className="text-sm font-medium text-theme-text">
            Password
          </span>
        </label>

        <PasswordInput
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <Button
        type="submit"
        variant="success"
        disabled={isPending}
        className="w-full"
        loading={isPending}
        loadingText="Singing In..."
      >
        Sign In
      </Button>

      <ActionLink to={`${ROUTES.REGISTER}`}>Create Account</ActionLink>
    </form>
  );
};
