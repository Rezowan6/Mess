import clsx from "clsx";
import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import "@/styles/modules/select.module.css";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;

  options: SelectOption[];

  placeholder?: string;

  leftIcon?: ReactNode;

  fullWidth?: boolean;

  permission?: Permission;

  tooltip?: string;

  isLoading?: boolean;
  loadingText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,

      options,

      placeholder,

      leftIcon,

      fullWidth = true,

      required,

      disabled,

      permission,

      tooltip,

      isLoading = false,
      loadingText = "Loading...",

      className,

      ...props
    },
    ref,
  ) => {
    const { can } = useRBAC();

    if (permission && !can(permission)) {
      return null;
    }

    const selectElement = (
      <div
        className={clsx(
          "flex items-center gap-2 rounded-sm border bg-surface px-3 transition-colors",
          error ? "border-error" : "border-border focus-within:border-primary",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        {leftIcon && <span className="text-text-muted">{leftIcon}</span>}

        <select
          ref={ref}
          disabled={disabled || isLoading}
          className={clsx(
            "w-full bg-transparent py-2 outline-none",
            "text-text",
            disabled && "cursor-not-allowed",
            !disabled && "cursor-pointer",
            className,
          )}
          {...props}
        >
          {isLoading ? (
            <option value="">{loadingText}</option>
          ) : (
            <>
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}

              {options.map((option) => (
                <option
                  key={option.value}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      </div>
    );

    return (
      <div className={clsx("space-y-1", fullWidth && "w-full")}>
        {label && (
          <label className="label">
            <span className="label-text font-medium">
              {label}

              {required && <span className="ml-1 text-error">*</span>}
            </span>
          </label>
        )}

        {tooltip ? (
          <div className="tooltip w-full" data-tip={tooltip}>
            {selectElement}
          </div>
        ) : (
          selectElement
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

Select.displayName = "Select";
