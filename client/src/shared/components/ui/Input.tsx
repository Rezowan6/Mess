import clsx from "clsx";
import { Loader2 } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;

  error?: string;

  helperText?: string;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  startAdornment?: ReactNode;

  endAdornment?: ReactNode;

  fullWidth?: boolean;

  tooltip?: string;

  permission?: Permission;

  isLoading?: boolean;

  loadingText?: string;

  size?: InputSize;
}

const sizeClasses = {
  sm: "h-9 text-sm",
  md: "h-11",
  lg: "h-12 text-lg",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      startAdornment,
      endAdornment,
      fullWidth = true,
      tooltip,
      permission,
      isLoading = false,
      loadingText,
      size = "md",
      required,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { can } = useRBAC();

    if (permission && !can(permission)) {
      return null;
    }

    const input = (
      <div
        className={clsx(
          "flex items-center gap-2 rounded-lg border bg-surface px-3",
          "transition-all duration-200",
          error
            ? "border-error"
            : "border-border focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
          (disabled || isLoading) && "cursor-not-allowed opacity-60",
          sizeClasses[size],
        )}
      >
        {startAdornment}

        {leftIcon && <span className="text-text-muted">{leftIcon}</span>}

        <input
          ref={ref}
          disabled={disabled || isLoading}
          className={clsx(
            "w-full bg-transparent outline-none",
            "text-text placeholder:text-text-muted",
            className,
          )}
          {...props}
        />

        {isLoading ? (
          <Loader2 size={18} className="animate-spin text-text-muted" />
        ) : (
          rightIcon && <span className="text-text-muted">{rightIcon}</span>
        )}

        {endAdornment}
      </div>
    );

    return (
      <div className={clsx("space-y-1", fullWidth && "w-full")}>
        {label && (
          <label className="label">
            <span className="label-text font-medium text-text">
              {label}

              {required && <span className="ml-1 text-error">*</span>}
            </span>
          </label>
        )}

        {tooltip ? (
          <div className="tooltip w-full" data-tip={tooltip}>
            {input}
          </div>
        ) : (
          input
        )}

        {isLoading && loadingText && (
          <p className="text-xs text-text-muted">{loadingText}</p>
        )}

        {error ? (
          <p className="text-sm text-error">{error}</p>
        ) : (
          helperText && <p className="text-sm text-text-muted">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
