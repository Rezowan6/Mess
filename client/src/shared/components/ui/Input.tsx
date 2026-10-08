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
  md: "h-11 text-sm",
  lg: "h-12 text-base",
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
      id,
      ...props
    },
    ref,
  ) => {
    const { can } = useRBAC();

    if (permission && !can(permission)) {
      return null;
    }

    const isDisabled = disabled || isLoading;

    const input = (
      <div
        className={clsx(
          "flex items-center gap-2 rounded-theme-md border bg-theme-input px-3",
          "transition-colors duration-200",
          error
            ? "border-theme-danger"
            : "border-theme-input-border hover:border-theme-border-hover focus-within:border-theme-input-focus",
          isDisabled &&
            "cursor-not-allowed bg-theme-input-disabled opacity-60 hover:border-theme-input-border",
          sizeClasses[size],
        )}
      >
        {startAdornment}

        {leftIcon && (
          <span className="shrink-0 text-theme-text-muted [&>svg]:size-4.5">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          disabled={isDisabled}
          required={required}
          aria-invalid={error ? true : undefined}
          className={clsx(
            "h-full w-full min-w-0 bg-transparent outline-none",
            // Global :focus-visible adds a ring; the wrapper border already shows focus
            "focus:outline-none focus-visible:shadow-none",
            "text-theme-text placeholder:text-theme-placeholder",
            "disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />

        {isLoading ? (
          <Loader2
            size={18}
            className="shrink-0 animate-spin text-theme-text-muted"
          />
        ) : (
          rightIcon && (
            <span className="shrink-0 text-theme-text-muted [&>svg]:size-4.5]">
              {rightIcon}
            </span>
          )
        )}

        {endAdornment}
      </div>
    );

    return (
      <div className={clsx("space-y-1.5", fullWidth && "w-full")}>
        {label && (
          <label htmlFor={id} className="block px-1">
            <span className="text-sm font-medium text-theme-text">
              {label}

              {required && (
                <span className="ml-1 text-theme-danger" aria-hidden="true">
                  *
                </span>
              )}
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
          <p className="px-1 text-xs text-theme-text-muted">{loadingText}</p>
        )}

        {error ? (
          <p role="alert" className="px-1 text-xs text-theme-danger">
            {error}
          </p>
        ) : (
          helperText && (
            <p className="px-1 text-xs text-theme-text-muted">{helperText}</p>
          )
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
