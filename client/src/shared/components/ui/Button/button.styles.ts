import { cn } from "@/shared/utils/cn";
import { neuCardClass } from "../SummaryStat";
import type { ButtonVariant, TooltipPlacement } from "./button.types";

// Shared neumorphic button base: raised by default, pressed on hover/click
const neuButtonBase = cn(
  neuCardClass,
  "active:shadow-theme-neu-inset active:scale-[0.98]",
);

export const variantClasses = {
  primary: cn(neuButtonBase, "text-theme-brand"),
  success: cn(neuButtonBase, "text-theme-success"),
  error: cn(neuButtonBase, "text-theme-danger"),
  warning: cn(neuButtonBase, "text-theme-warning"),
  secondary: cn(neuButtonBase, "text-theme-text-secondary"),
  accent: cn(neuButtonBase, "text-theme-accent"),
  ghost: "bg-transparent text-theme-text hover:bg-theme-surface-hover",
  outline:
    "border border-theme-border text-theme-text hover:bg-theme-surface-hover",
  pay: cn(
    "bg-theme-brand text-theme-on-brand shadow-theme-brand",
    "hover:bg-theme-brand-hover active:scale-[0.98]",
  ),
} satisfies Record<ButtonVariant, string>;

// Full class names, so Tailwind can detect them
export const TOOLTIP_PLACEMENT = {
  top: "tooltip-top",
  bottom: "tooltip-bottom",
  left: "tooltip-left",
  right: "tooltip-right",
} as const satisfies Record<TooltipPlacement, string>;

// Readable tooltip: wraps long text, rounded, with a soft shadow
export const TOOLTIP_STYLE = [
  "[--tt-bg:var(--theme-tooltip)]",
  "before:z-50 after:z-50",
  "before:max-w-52 before:whitespace-normal before:break-words",
  "before:px-3 before:py-2 before:rounded-theme-lg before:shadow-theme-lg",
  "before:text-center before:text-xs before:font-medium before:leading-snug",
  "before:text-theme-tooltip-text",
].join(" ");
