import type { INotification } from "../types/notification.types";

interface Props {
  notification: INotification;
}

export const NotificationItem = ({ notification }: Props) => {
  return (
    <div className="p-3 border-b last:border-b-0 hover:bg-base-200">
      <h4 className="font-semibold">{notification.title}</h4>

      <p className="text-sm text-gray-500">{notification.message}</p>
    </div>
  );
};
