import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { Badge } from "@/shared/components/ui/Badge";

interface RecoveryItemBaseProps {
  title: string;
  description: string;
  icon: ReactNode;
}

// An item either links to its recovery page or is marked as not available yet, never both
type RecoveryItemProps = RecoveryItemBaseProps &
  ({ to: string; unavailable?: false } | { to?: undefined; unavailable: true });

export const RecoveryItem = ({
  title,
  description,
  icon,
  to,
  unavailable,
}: RecoveryItemProps) => {
  return (
    <li className="flex flex-col gap-3 rounded-theme-md border border-theme-border p-4 transition-colors hover:bg-theme-surface-hover sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-theme-md bg-theme-info/10 text-theme-info">
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="font-medium text-theme-text">{title}</h3>
          <p className="mt-1 text-sm leading-5 text-theme-text-muted">
            {description}
          </p>

          {unavailable && (
            <Badge size="sm" variant="soft-secondary" className="mt-2">
              Recovery not configured
            </Badge>
          )}
        </div>
      </div>

      {to && (
        <ActionLink
          to={to}
          icon={ArrowUpRight}
          className="shrink-0 self-start sm:self-center"
        >
          Open recovery
        </ActionLink>
      )}
    </li>
  );
};
