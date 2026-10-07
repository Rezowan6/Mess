import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRegister } from "../hooks/useRegister";

import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { PasswordInput } from "@/shared/components/ui/PasswordInput";

import { registerSchema, type IRegisterFormData } from "../schemas/auth.schema";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { ROUTES } from "@/shared/constants/routes";
import { registerFields } from "../configs/registerFields";

export const RegisterForm = () => {
  const { mutate, isPending } = useRegister();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: IRegisterFormData) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {registerFields.map((field) => {
        if (field.type === "password") {
          return (
            <div key={field.name}>
              <label className="block px-1">
                <span className="text-sm font-medium text-theme-text">
                  {field.label}
                </span>
              </label>

              <PasswordInput
                placeholder={field.placeholder}
                error={errors[field.name]?.message}
                {...register(field.name)}
              />
            </div>
          );
        }

        return (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name]?.message}
            {...register(field.name)}
          />
        );
      })}

      <Button
        type="submit"
        variant="success"
        className="w-full"
        loading={isPending}
        loadingText="Creating Account..."
        disabled={isPending}
      >
        Create Account
      </Button>
      <ActionLink to={`${ROUTES.LOGIN}`}>Sign In</ActionLink>
    </form>
  );
};
