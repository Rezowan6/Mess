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
          "flex items-center gap-2 rounded-theme-md border bg-theme-input px-3",
          "transition-all duration-200",
          error
            ? "border-theme-danger"
            : "border-theme-input-border focus-within:border-theme-input-focus",
          (disabled || isLoading) && "cursor-not-allowed opacity-60",
          sizeClasses[size],
        )}
      >
        {startAdornment}

        {leftIcon && <span className="text-theme-text-muted">{leftIcon}</span>}

        <input
          ref={ref}
          disabled={disabled || isLoading}
          className={clsx(
            "w-full bg-transparent outline-none",
            "text-theme-text placeholder:text-theme-placeholder",
            className,
          )}
          {...props}
        />

        {isLoading ? (
          <Loader2 size={18} className="animate-spin text-theme-text-muted" />
        ) : (
          rightIcon && (
            <span className="text-theme-text-muted">{rightIcon}</span>
          )
        )}

        {endAdornment}
      </div>
    );

    return (
      <div className={clsx("space-y-1", fullWidth && "w-full")}>
        {label && (
          <label className="block px-1">
            <span className="text-sm font-medium text-theme-text">
              {label}

              {required && <span className="ml-1 text-theme-danger">*</span>}
            </span>
          </label>
        )}

        {tooltip ? (
          <div className="group relative w-full">
            {input}

            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-theme-sm bg-theme-tooltip px-2 py-1 text-xs text-theme-tooltip-text opacity-0 shadow-theme-md transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
            >
              {tooltip}
            </span>
          </div>
        ) : (
          input
        )}

        {isLoading && loadingText && (
          <p className="text-xs text-theme-text-muted">{loadingText}</p>
        )}

        {error ? (
          <p className="text-sm text-theme-danger">{error}</p>
        ) : (
          helperText && (
            <p className="text-sm text-theme-text-muted">{helperText}</p>
          )
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
