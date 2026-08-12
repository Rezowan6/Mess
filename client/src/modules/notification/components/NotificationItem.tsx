import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { StatusIndicator } from "@/shared/components/ui/StatusIndicator";
import { Trash2 } from "lucide-react";
import { useMarkAsRead } from "../hooks/useMarkAsRead";
import type { INotification } from "../types/notification.types";

interface Props {
  notification: INotification;
}

export const NotificationItem = ({ notification }: Props) => {
  const { mutate: markAsRead, isPending } = useMarkAsRead();

  const handleMarkAsRead = () => {
    if (notification.isRead || isPending) {
      return;
    }
    markAsRead(notification.id);
  };
  return (
    <div
      onClick={handleMarkAsRead}
      className={[
        "group flex items-start gap-3 border-b border-info p-4",
        "transition-all duration-200",
        "hover:bg-success/5",
        notification.isRead ? "bg-background" : "bg-info/5",
      ].join(" ")}
    >
      {/* Notification Indicator */}
      <StatusIndicator
        active={!notification.isRead}
        activeClassName="bg-info"
        inactiveClassName="bg-success"
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4
              className={[
                "text-sm",
                notification.isRead
                  ? "font-medium text-base-content"
                  : "font-semibold text-base-content",
              ].join(" ")}
            >
              {notification.title}
            </h4>

            <p className="mt-1 text-sm leading-5 text-base-content/60">
              {notification.message}
            </p>
          </div>
          {/* Delete Button */}
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Button unstyled leftIcon={<Trash2 />} />
          </div>{" "}
        </div>

        {/* Status */}
        {!notification.isRead && (
          <Badge size="sm" variant="soft-info">
            New
          </Badge>
        )}
      </div>
    </div>
  );
};
