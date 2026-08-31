import { useAuthStore } from "@/modules/auth/store/auth.store";
import { addNotificationToCache } from "@/modules/notification/utils/notification-cache";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { socket } from "@/services/socket";
import { queryKeys } from "@/shared/constants/queryKeys";
import { SocketEvent } from "@/shared/constants/socket-event";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);
  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id || !currentTenant?.tenantId) {
      return;
    }
    socket.connect();

    socket.on("connect", () => {
      socket.emit(SocketEvent.JOIN, {
        userId: user?.id,
        tenantId: currentTenant?.tenantId,
      });
    });
    // handlers...

    // meal planning
    const handleMealPlanningUpdated = () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPlanning.daily(currentTenant?.tenantId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.mealPreference.myPreference(
          currentTenant?.tenantId,
        ),
      });
    };

    // notification
    const handleNotification = (notification: any) => {
      addNotificationToCache(queryClient, notification, currentTenant.tenantId);
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
  }, [user?.id, currentTenant?.tenantId, queryClient]);

  return <>{children}</>;
};
