import { useNotifications } from "../hooks/useNotifications";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { NotificationItem } from "../components/NotificationItem";

export const NotificationPage = () => {
  const { data } = useNotifications();

  return (
    <>
      <ManagementPage
        title="Notifications"
        description="View your latest mess notifications and updates."
      >
        <div className="rounded-xl border">
          {data?.data.map((item) => (
            <NotificationItem key={item.id} notification={item} />
          ))}
        </div>
      </ManagementPage>
    </>
  );
};
