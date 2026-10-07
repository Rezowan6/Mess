import type { ButtonVariant, TooltipPlacement } from "./button.types";

export const variantClasses = {
  primary: `bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-800 hover:to-blue-600 hover:shadow-blue-500/30`,
  success: `bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 hover:shadow-green-500/30`,
  error: `bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 hover:shadow-red-500/30`,
  warning: `bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-orange-500/30`,
  secondary: `bg-gradient-to-r from-slate-500 to-slate-700 hover:from-slate-600 hover:to-slate-800 hover:shadow-slate-500/30`,
  accent: `bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/30`,
  ghost: `bg-transparent text-theme-text hover:bg-surface-hover`,
  outline: `border border-theme-border text-theme-text hover:bg-surface-hover`,
  pay: `bg-gradient-to-b from-blue-500 to-blue-700 ring-1 ring-inset ring-white/20 shadow-md shadow-blue-900/30 hover:from-blue-400 hover:to-blue-600 hover:shadow-blue-500/40`,
} satisfies Record<ButtonVariant, string>;
/** Gradient variants: white text, shadow and lift effect. */
export const SOLID_VARIANTS = new Set<ButtonVariant>(["primary", "secondary", "accent", "success", "warning", "error", "pay"]);

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
