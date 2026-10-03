import { Check, Copy } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { useCopyToClipboard } from "@/shared/hooks/useCopyToClipboard";
import { Badge, type IBadgeVariant } from "./Badge";

interface CopyBadgeProps {
  /** The value that will be copied */
  value: string | number;
  children: ReactNode;
  /** Accessible label for the button */
  label?: string;
  variant?: IBadgeVariant;
  size?: ComponentProps<typeof Badge>["size"];
  leftIcon?: ReactNode;
}

export const CopyBadge = ({
  value,
  children,
  label,
  variant = "neutral",
  size = "sm",
  leftIcon,
}: CopyBadgeProps) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      aria-label={label ?? `Copy ${value}`}
      className="group cursor-pointer rounded-full transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info/50"
    >
      <Badge
        variant={variant}
        size={size}
        leftIcon={leftIcon}
        rightIcon={
          copied ? (
            <Check className="text-success" />
          ) : (
            <Copy className="opacity-0 transition-opacity group-hover:opacity-100" />
          )
        }
      >
        {children}
      </Badge>

      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
};
