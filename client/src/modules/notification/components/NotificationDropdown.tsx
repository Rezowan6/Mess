import { useNotifications } from "../hooks/useNotifications";

import { NotificationItem } from "./NotificationItem";

export const NotificationDropdown = ({ isOpen }: { isOpen: boolean }) => {
  const { data } = useNotifications({
    limit: 5,
  });

  const notifications = data?.data || [];

  return (
    <div
      className={`absolute right-0 top-full sm:mt-3 z-50 w-screen overflow-x-auto sm:w-80 overflow-hidden bg-background shadow-xl sm:rounded-md sm:border sm:border-info transition-all duration-300 ease-in-out ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
    >
      {notifications &&
        notifications.map((item) => (
          <NotificationItem key={item.id} notification={item} />
        ))}

      {notifications.length === 0 && (
        <span className="block py-8 text-center text-sm text-base-content/50">
          Notification not found.
        </span>
      )}
    </div>
  );
};
