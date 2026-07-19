import clsx from "clsx";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  error?: string;

  helperText?: string;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,

      error,

      helperText,

      leftIcon,

      rightIcon,

      fullWidth = true,

      required,

      className,

      disabled,

      ...props
    },
    ref,
  ) => {
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

        <div
          className={clsx(
            "flex items-center gap-2 rounded-lg border bg-base-100 px-3",
            error
              ? "border-error"
              : "border-base-300 focus-within:border-primary",

            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {leftIcon && <span className="text-base-content/60">{leftIcon}</span>}

          <input
            ref={ref}
            disabled={disabled}
            className={clsx(
              "w-full bg-transparent py-2 outline-none",
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <span className="text-base-content/60">{rightIcon}</span>
          )}
        </div>

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

Input.displayName = "Input";
