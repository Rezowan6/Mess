import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";
import { type ReactNode } from "react";

import { Check, ChevronDown, ChevronUp } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;

  placeholder?: string;

  options: SelectOption[];

  value?: string;

  onValueChange?: (value: string) => void;

  error?: string;

  helperText?: string;

  disabled?: boolean;

  required?: boolean;

  leftIcon?: ReactNode;

  className?: string;
}

export const Select = ({
  label,

  placeholder = "Select option",

  options,

  value,

  onValueChange,

  error,

  helperText,

  disabled,

  required,

  leftIcon,

  className,
}: SelectProps) => {
  return (
    <div className="space-y-1 w-full">
      {label && (
        <label className="label">
          <span className="label-text font-medium">
            {label}

            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}

      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={clsx(
            "flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm bg-base-100",

            error ? "border-error" : "border-base-300",

            disabled && "opacity-60 cursor-not-allowed",

            className,
          )}
        >
          <div className="flex items-center gap-2">
            {leftIcon}

            <SelectPrimitive.Value placeholder={placeholder} />
          </div>

          <SelectPrimitive.Icon>
            <ChevronDown size={18} />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="
                    z-50 
                    overflow-hidden
                    rounded-lg
                    border
                    bg-base-100
                    shadow-lg
                    "
          >
            <SelectPrimitive.ScrollUpButton className="flex justify-center py-1">
              <ChevronUp size={16} />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="
                            relative
                            flex
                            cursor-pointer
                            select-none
                            items-center
                            rounded-md
                            px-3
                            py-2
                            text-sm
                            outline-none

                            hover:bg-primary
                            hover:text-primary-content

                            "
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>

                  <SelectPrimitive.ItemIndicator className="absolute right-3">
                    <Check size={16} />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton />
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error ? (
        <p className="text-sm text-error">{error}</p>
      ) : (
        helperText && <p className="text-sm opacity-70">{helperText}</p>
      )}
    </div>
  );
};

Select.displayName = "Select";
