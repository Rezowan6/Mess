import { useAuthStore } from "@/modules/auth/store/auth.store";
import { addNotificationToCache } from "@/modules/notification/utils/notification-cache";
import { invalidateRealtimeQueries } from "@/services/realtime/realtime-invalidation";
import type { IDataUpdatedPayload } from "@/services/realtime/realtime.types";
import { socket } from "@/services/socket";
import { queryKeys } from "@/shared/constants/queryKeys";
import { SocketEvent } from "@/shared/constants/socket-event";
import { useCurrentTenantContext } from "@/shared/hooks/useCurrentTenantContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { tenantId, mealSessionId } = useCurrentTenantContext();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id || !tenantId) {
      return;
    }

    const handleConnect = () => {
      socket.emit(SocketEvent.JOIN, {
        tenantId,
        ...(mealSessionId ? { mealSessionId } : {}),
      });
    };

    const handleDataUpdated = (payload: IDataUpdatedPayload) => {
      if (payload.tenantId !== tenantId) {
        return;
      }

      if (
        payload.mealSessionId !== undefined &&
        payload.mealSessionId !== mealSessionId
      ) {
        return;
      }

      invalidateRealtimeQueries(queryClient, payload);
    };

    const handleNotification = (notification: any) => {
      if (mealSessionId) {
        addNotificationToCache(
          queryClient,
          notification,
          tenantId,
          mealSessionId,
        );
      }

      if (notification?.type === "ROLE_UPDATED") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.auth.me,
        });
      }
    };

    socket.on("connect", handleConnect);
    socket.on(SocketEvent.DATA_UPDATED, handleDataUpdated);
    socket.on(SocketEvent.NOTIFICATION, handleNotification);

    socket.connect();

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off(SocketEvent.DATA_UPDATED, handleDataUpdated);
      socket.off(SocketEvent.NOTIFICATION, handleNotification);
      socket.disconnect();
    };
  }, [user?.id, tenantId, mealSessionId, queryClient]);

  return <>{children}</>;
};
