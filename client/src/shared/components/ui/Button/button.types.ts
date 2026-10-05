import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { Permission } from "@/shared/constants/permissions";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "ghost"
  | "outline"
  | "pay";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

  /** Where the tooltip opens. Use "left" for buttons at the right edge. */
  tooltipPlacement?: TooltipPlacement | undefined;

  permission?: Permission;
}