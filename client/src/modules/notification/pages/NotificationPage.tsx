import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { NotificationItem } from "../components/NotificationItem";
import { NotificationSkeleton } from "../components/NotificationSkeleton";
import { useNotifications } from "../hooks/useNotifications";

export const NotificationPage = () => {
  const { data, isPending, isError, refetch } = useNotifications();

  const notifications = data?.data ?? [];

  const renderContent = () => {
    if (isPending) {
      return <NotificationSkeleton />;
    }

    // Show the error only when there is no cached data to display
    if (isError && !data) {
      return (
        <ErrorState
          title="Failed to Load Notifications"
          description="Unable to fetch your notifications. Please try again."
          onRetry={() => refetch()}
        />
      );
    }

    if (notifications.length === 0) {
      return (
        <EmptyState
          title="No Notifications Yet"
          description="You are all caught up. New updates from your mess will appear here."
        />
      );
    }

    return (
      <div>
        {notifications.map((item) => (
          <NotificationItem key={item.id} notification={item} />
        ))}
      </div>
    );
  };

  return (
    <ManagementPage
      title="Notifications"
      description="View your latest mess notifications and updates."
    >
      {renderContent()}
    </ManagementPage>
  );
};
