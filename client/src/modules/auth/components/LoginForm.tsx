import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "../hooks/useLogin";

import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

export const LoginForm = () => {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}

      <div>
        <label className="label">
          <span className="label-text">Email:</span>
        </label>

        <input
          type="email"
          placeholder="Enter your email: "
          className="input input-bordered w-full"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-error">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="label">
          <span className="label-text">Password</span>
        </label>

        <input
          type="password"
          placeholder="Enter your password"
          className="input input-bordered w-full"
          {...register("password")}
        />

        {errors.password && (
          <p className="mt-1 text-sm text-error">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Singing In..." : "Sign In"}
      </button>
    </form>
  );
};
