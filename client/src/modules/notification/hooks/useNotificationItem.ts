import { useDeleteNotification } from "./useDeleteNotification";
import { useMarkAsRead } from "./useMarkAsRead";

export const useNotificationItem = (
  notificationId: number,
  isRead: boolean,
) => {
  const { mutate: markAsRead, isPending: isMarkingAsRead } = useMarkAsRead();

  const { mutate: deleteNotification, isPending: isDeleting } =
    useDeleteNotification();

  const handleMarkAsRead = () => {
    if (isRead || isMarkingAsRead || isDeleting) {
      return;
    }

    markAsRead(notificationId);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (isDeleting || isMarkingAsRead) {
      return;
    }

    deleteNotification(notificationId);
  };

  return {
    handleMarkAsRead,
    handleDelete,
    isMarkingAsRead,
    isDeleting,
  };
};
