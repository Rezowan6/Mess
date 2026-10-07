import clsx from "clsx";
import { Trash2 } from "lucide-react";

import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { StatusIndicator } from "@/shared/components/ui/StatusIndicator";

import { useNotificationItem } from "../hooks/useNotificationItem";
import type { INotification } from "../types/notification.types";

interface Props {
  notification: INotification;
}

export const NotificationItem = ({ notification }: Props) => {
  const { handleMarkAsRead, handleDelete, isDeleting } = useNotificationItem(
    notification.id,
    notification.isRead,
  );

  const isUnread = !notification.isRead;

  return (
    <div
      onClick={handleMarkAsRead}
      className={clsx(
        "group flex items-start gap-3 border-b border-theme-border p-4 last:border-0",
        "transition-colors duration-200",
        isUnread
          ? "cursor-pointer bg-theme-success-soft hover:bg-theme-card-hover"
          : "bg-transparent hover:bg-theme-info-soft",
      )}
    >
      <StatusIndicator
        active={isUnread}
        activeClassName="bg-theme-success"
        inactiveClassName="bg-transparent"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4
              className={clsx(
                "wrap-break-word text-sm",
                isUnread
                  ? "font-semibold text-theme-text"
                  : "font-medium text-theme-text-secondary",
              )}
            >
              {notification.title}
            </h4>

            <p className="mt-1 wrap-break-word text-sm leading-5 text-theme-text-muted">
              {notification.message}
            </p>
          </div>

          <Button
            unstyled
            aria-label="Delete notification"
            leftIcon={<Trash2 />}
            onClick={handleDelete}
            disabled={isDeleting}
            className={clsx(
              "shrink-0 text-theme-danger",
              // Always visible on touch screens, revealed on hover for desktop
              "sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100",
            )}
          />
        </div>

        {isUnread && (
          <Badge size="sm" variant="soft-success" className="mt-2">
            New
          </Badge>
        )}
      </div>
    </div>
  );
};
