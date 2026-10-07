import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import {
  forwardRef,
  useState,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";

import type { Permission } from "@/shared/constants/permissions";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useRBAC } from "@/shared/hooks/useRBAC";

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
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { can } = useRBAC();

    const [isOpen, setIsOpen] = useState(false);

    const initialValue =
      value !== undefined
        ? String(value)
        : defaultValue !== undefined
          ? String(defaultValue)
          : "";

    const [internalValue, setInternalValue] = useState(initialValue);

    const selectedValue = value !== undefined ? String(value) : internalValue;

    const selectedOption = options.find(
      (option) => String(option.value) === selectedValue,
    );

    const closeDropdown = () => {
      setIsOpen(false);
    };

    const containerRef = useClickOutside<HTMLDivElement>(closeDropdown);

    if (permission && !can(permission)) {
      return null;
    }

    const handleSelect = (option: SelectOption) => {
      if (option.disabled || disabled || isLoading) return;

      const nextValue = String(option.value);

      if (value === undefined) {
        setInternalValue(nextValue);
      }

      const syntheticEvent = {
        target: {
          value: nextValue,
          name: props.name,
        },
        currentTarget: {
          value: nextValue,
          name: props.name,
        },
      } as React.ChangeEvent<HTMLSelectElement>;

      onChange?.(syntheticEvent);

      setIsOpen(false);
    };

    const selectElement = (
      <div ref={containerRef} className="relative w-full overflow-visible">
        <div
          className={clsx(
            "flex w-full min-w-0 items-center rounded-theme-md border bg-theme-input transition-all duration-200",
            error
              ? "border-theme-danger"
              : isOpen
                ? "border-theme-input-focus"
                : "border-theme-input-border",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {leftIcon && (
            <span className="shrink-0 text-theme-text-muted">{leftIcon}</span>
          )}

          <button
            type="button"
            disabled={disabled || isLoading}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className={clsx(
              "flex w-full items-center justify-between gap-1 bg-transparent py-2 px-3 text-left outline-none",
              disabled || isLoading ? "cursor-not-allowed" : "cursor-pointer",
              className,
            )}
          >
            <span
              className={clsx(
                selectedOption ? "text-theme-text" : "text-theme-text-mutedt",
              )}
            >
              {isLoading
                ? loadingText
                : selectedOption?.label || placeholder || "Select..."}
            </span>

            <ChevronDown
              size={16}
              className={clsx(
                "shrink-0 text-theme-text-muted transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </button>
        </div>

        <div
          className={clsx(
            "absolute left-0 right-0 top-full z-999 mt-0.5 origin-top overflow-hidden rounded-theme-lg border border-theme-border bg-theme-surface-raised",
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0",
          )}
          role="listbox"
        >
          {isLoading ? (
            <div className="px-3 py-2 text-sm text-theme-text-muted">
              {loadingText}
            </div>
          ) : options.length ? (
            options.map((option) => {
              const isSelected = String(option.value) === selectedValue;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                  className={clsx(
                    "w-full rounded-theme-md py-1.5 text-left pl-3 mt-1 text-sm transition-colors duration-150",
                    option.disabled
                      ? "cursor-not-allowed opacity-50"
                      : isSelected
                        ? "bg-theme-brand-soft font-semibold text-theme-accent"
                        : "text-theme-text hover:bg-theme-surface-hover",
                  )}
                >
                  {option.label}
                </button>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-theme-text-muted">
              No options available
            </div>
          )}
        </div>

        {/* Hidden native select keeps form/ref compatibility */}
        <select
          ref={ref}
          value={selectedValue}
          onChange={onChange}
          disabled={disabled || isLoading}
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          {...props}
        >
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
        </select>
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
            {selectElement}

            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-theme-sm bg-theme-tooltip px-2 py-1 text-xs text-theme-tooltip-text opacity-0 shadow-theme-md transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100"
            >
              {tooltip}
            </span>
          </div>
        ) : (
          selectElement
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

Select.displayName = "Select";
