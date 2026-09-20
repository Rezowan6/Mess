import clsx from "clsx";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type GradientButtonVariant =
  "primary" | "success" | "danger" | "warning" | "info" | "dark";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: GradientButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  width?: string;
  height?: string;
}

const variants: Record<GradientButtonVariant, string> = {
  primary: "from-indigo-500 via-purple-500 to-pink-500 shadow-indigo-500/30",
  success: "from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-500/30",
  danger: "from-red-500 via-rose-500 to-pink-500 shadow-red-500/30",
  warning: "from-amber-400 via-orange-500 to-red-500 shadow-orange-500/30",
  info: "from-cyan-400 via-blue-500 to-indigo-500 shadow-blue-500/30",
  dark: "from-slate-700 via-slate-800 to-black shadow-slate-900/30",
};

export const GradientButton = forwardRef<
  HTMLButtonElement,
  GradientButtonProps
>(
  (
    {
      children,
      variant = "primary",
      leftIcon,
      rightIcon,
      fullWidth = false,
      loading = false,
      loadingText = "Loading...",
      width,
      height,
      disabled,
      className,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        style={{
          width: fullWidth ? "100%" : width,
          height,
        }}
        className={clsx(
          "group relative inline-flex min-w-0 items-center justify-center",
          "overflow-hidden rounded-xl px-5 py-2.5",
          "text-sm font-semibold text-white",
          "bg-gradient-to-r",
          "transition-all duration-300 ease-out",
          "shadow-lg",
          "hover:-translate-y-0.5 hover:shadow-xl",
          "active:translate-y-0 active:scale-[0.98]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60",
          variants[variant],
          className,
        )}
        {...props}
      >
        {/* Shine Effect */}
        <span
          className={clsx(
            "absolute inset-0 -translate-x-full",
            "bg-gradient-to-r from-transparent via-white/25 to-transparent",
            "transition-transform duration-700",
            "group-hover:translate-x-full",
          )}
        />

        {/* Glow */}
        <span
          className={clsx(
            "absolute inset-0 opacity-0",
            "bg-white/10",
            "transition-opacity duration-300",
            "group-hover:opacity-100",
          )}
        />

        {/* Content */}
        <span className="relative z-10 flex min-w-0 items-center justify-center gap-2">
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span className="truncate">{loadingText}</span>
            </>
          ) : (
            <>
              {leftIcon && (
                <span className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">
                  {leftIcon}
                </span>
              )}

              <span className="truncate">{children}</span>

              {rightIcon && (
                <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </span>
      </button>
    );
  },
);

GradientButton.displayName = "GradientButton";
