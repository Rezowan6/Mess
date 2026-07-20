import { Eye, EyeOff, Lock } from "lucide-react";
import { forwardRef, useState, type InputHTMLAttributes } from "react";

import { Input } from "./Input";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, helperText, fullWidth, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        label={label}
        error={error}
        helperText={helperText}
        fullWidth={fullWidth}
        disabled={disabled}
        leftIcon={<Lock size={18} />}
        rightIcon={
          <button
            type="button"
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              cursor-pointer
              text-text-muted
              transition-colors
              hover:text-text
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
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
