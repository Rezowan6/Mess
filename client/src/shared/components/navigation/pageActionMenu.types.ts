import type { LucideIcon } from "lucide-react";

export interface IPageActionMenuItem {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export type PageActionMenuPlacement =
  "bottom-start" | "bottom-end" | "top-start" | "top-end";
