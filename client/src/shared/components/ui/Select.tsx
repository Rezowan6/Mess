import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import clsx from "clsx";
import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

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

    const select = (
      <div
        className={clsx(
          "tooltip",
          "flex items-center gap-2 rounded-lg border bg-base-100",
          error
            ? "border-error"
            : "border-base-300 focus-within:border-primary",

          disabled && "cursor-not-allowed opacity-60",
        )}
        data-tip={tooltip}
      >
        {leftIcon && <span className="text-base-content/60">{leftIcon}</span>}
        <select
          ref={ref}
          disabled={disabled || isLoading}
          className={clsx(
            "p-2 w-full bg-[#1c356b88] cursor-pointer rounded-md outline-none",

            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="cursor-pointer">
              {isLoading && <option>{loadingText}</option>}
              {placeholder}
            </option>
          )}

          {!isLoading &&
            options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
        </select>
      </div>
    );

    if (!tooltip) {
      return select;
    }
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
        {select}

        {error ? (
          <p className="text-sm text-error">{error}</p>
        ) : (
          helperText && (
            <p className="text-sm text-base-content/60">{helperText}</p>
          )
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
