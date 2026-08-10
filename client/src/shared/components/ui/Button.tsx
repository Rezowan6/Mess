import clsx from "clsx";
import { Loader2 } from "lucide-react";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import styel from "@/styles/modules/button.module.css";

type ButtonVariant =
  | "moduleBtn"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;

  unstyled?: boolean;

  iconSize?: number;

  variant?: ButtonVariant;

  loading?: boolean;

  loadingText?: string;

  fullWidth?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  tooltip?: string;

  permission?: Permission;
}

const variantClasses = {
  moduleBtn: `
    ${styel.btn}
    `,
  primary: `
    bg-gradient-to-r 
    from-blue-600 
    to-indigo-600
    hover:from-blue-700 
    hover:to-indigo-700
    `,

  success: `
    bg-gradient-to-r 
    from-teal-600 
    to-green-600
    hover:from-teal-700
    hover:to-green-700
    `,

  error: `
    bg-gradient-to-r
    from-red-500
    to-pink-600
    hover:from-red-600
    hover:to-pink-700
    `,

  warning: `
    bg-gradient-to-r
    from-yellow-500
    to-orange-500
    hover:from-yellow-600
    hover:to-orange-600
    `,

  secondary: `
    bg-gradient-to-r
    from-slate-500
    to-slate-700
    hover:from-slate-600
    hover:to-slate-800
    `,

  accent: `
    bg-gradient-to-r
    from-purple-600
    to-pink-600
    hover:from-purple-700
    hover:to-pink-700
    `,

  ghost: `
    bg-transparent
    text-text
    hover:bg-surface-hover
    `,

  outline: `
    border
    border-border
    text-text
    hover:bg-surface-hover
    `,
} satisfies Record<ButtonVariant, string>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      unstyled = false,
      iconSize = 16,

      variant = "primary",

      loading = false,

      loadingText = "Processing...",

      fullWidth = false,

      leftIcon,

      rightIcon,

      tooltip,

      permission,

      disabled,

      className,

      ...props
    },
    ref,
  ) => {
    const { can } = useRBAC();

    if (permission && !can(permission)) {
      return null;
    }

    const button = (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          !unstyled && [variantClasses[variant], "px-4 sm:h-10 flex justify-center items-center"],

          "cursor-pointer ml-4 bg-info/20 hover:bg-info/40 p-2 rounded-sm disabled:opacity-50 disabled:pointer-events-none transition-all duration-300",

          fullWidth && "w-full",

          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />

            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {leftIcon &&
              isValidElement(leftIcon) &&
              cloneElement(leftIcon as ReactElement<{ size?: number }>, {
                size: iconSize,
              })}

            {children && <span>{children}</span>}

            {rightIcon &&
              isValidElement(rightIcon) &&
              cloneElement(rightIcon as ReactElement<{ size?: number }>, {
                size: iconSize,
              })}
          </>
        )}
      </button>
    );

    if (!tooltip) {
      return button;
    }

    return (
      <div className="tooltip tooltip-top" data-tip={tooltip}>
        {button}
      </div>
    );
  },
);

Button.displayName = "Button";
