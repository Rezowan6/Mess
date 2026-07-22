import { useNotifications } from "../hooks/useNotifications";

import { NotificationItem } from "../components/NotificationItem";

export const NotificationPage = () => {
  const { data } = useNotifications();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Notifications</h1>

      <div className="rounded-xl border">
        {data?.data.map((item) => (
          <NotificationItem key={item.id} notification={item} />
        ))}
      </div>
    </div>
  );
};
