import { useNotifications } from "../hooks/useNotifications";

import { NotificationItem } from "./NotificationItem";

export const NotificationDropdown = ({ isOpen }: { isOpen: boolean }) => {
  const { data } = useNotifications({
    limit: 5,
  });


  const notifications = data?.data || [];

  return (
    <div
      className={`absolute right-0 top-full mt-3 z-50 w-80 bg-base-100 shadow-xl rounded-md border transition-all duration-300 ease-in-out ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
    >
      {notifications &&
        notifications.map((item) => (
          <NotificationItem key={item.id} notification={item} />
        ))}

      {notifications.length === 0 && (
        <span className="">Notification not found.</span>
      )}
    </div>
  );
};
