import { useNotifications } from "../hooks/useNotifications";

import { NotificationItem } from "./NotificationItem";

export const NotificationDropdown = () => {
  const { data } = useNotifications({
    limit: 5,
  });

  return (
    <div className="absolute right-0 mt-2 w-80 bg-base-100 shadow-xl rounded-md border py-8">
      {data?.data.map((item) => (
        <NotificationItem key={item.id} notification={item} />
      ))}
    </div>
  );
};
