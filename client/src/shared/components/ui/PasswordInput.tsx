import { Eye, EyeOff, Lock } from "lucide-react";
import { forwardRef, useState } from "react";

import { Input } from "./Input";

import type { InputHTMLAttributes } from "react";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, helperText, fullWidth, ...props }, ref) => {
    
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        label={label}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        leftIcon={<Lock size={18} />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer text-base-content/60 transition hover:text-base-content"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
        {...props}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";
