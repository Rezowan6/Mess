import { useAuthStore } from "@/modules/auth/store/auth.store";
import { addNotificationToCache } from "@/modules/notification/utils/notification-cache";
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
    if (!user?.id || !tenantId || !mealSessionId) {
      return;
    }
    socket.connect();

    socket.on("connect", () => {
      socket.emit(SocketEvent.JOIN, {
        userId: user?.id,
        tenantId: tenantId,
        mealSessionId,
      });
    });

    // meal planning
    const handleMealPlanningUpdated = () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(tenantId, mealSessionId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPreference.myPreference(
          tenantId,
          mealSessionId,
        ),
      });
    };

    // notification
    const handleNotification = (notification: any) => {

      addNotificationToCache(
        queryClient,
        notification,
        tenantId,
        mealSessionId as number,
      );

      /**
       * Role updated
       * Refetch /auth/me so RBAC gets the latest role.
       */
      if (notification?.type === "ROLE_UPDATED") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.auth.me,
        });
      }
    };

    socket.on(SocketEvent.MEAL_PLANNING_UPDATED, handleMealPlanningUpdated);
    socket.on(SocketEvent.NOTIFICATION, handleNotification);

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    // cleanup...
    return () => {
      socket.off(SocketEvent.MEAL_PLANNING_UPDATED, handleMealPlanningUpdated);
      socket.off(SocketEvent.NOTIFICATION);
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, [user?.id, tenantId, mealSessionId, queryClient]);

  return <>{children}</>;
};
