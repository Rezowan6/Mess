export const CARD_STYLES = {
  base: [
    "group relative rounded-theme-xl",
    "border border-theme-border bg-theme-card backdrop-blur-xl",
    "shadow-theme-md",
    "transition-all duration-500 ease-out",
    "hover:-translate-y-1 hover:border-theme-border-hover",
    "hover:bg-theme-card-hover hover:shadow-theme-lg",
  ].join(" "),

  glow: [
    "pointer-events-none absolute -right-12 -top-12 h-32 w-32",
    "rounded-full bg-theme-info-soft blur-3xl",
    "transition-all duration-700",
    "group-hover:scale-150 group-hover:bg-theme-success-soft",
  ].join(" "),

  overlay: [
    "pointer-events-none absolute inset-0",
    "bg-linear-to-br from-theme-surface-hover via-transparent to-theme-info-soft",
  ].join(" "),

  icon: [
    "flex items-center justify-center rounded-theme-lg",
    "border border-theme-border",
    "bg-linear-to-br from-theme-surface-raised to-theme-surface-sunken",
    "backdrop-blur-md",
    "text-theme-info shadow-inner",
    "transition-all duration-500",
    "group-hover:scale-110 group-hover:rotate-2",
    "group-hover:text-theme-success",
  ].join(" "),

  bottomGradient: [
    "absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2",
    "bg-linear-to-r from-transparent via-theme-info to-transparent",
    "transition-all duration-700",
    "group-hover:w-3/4",
  ].join(" "),
};
