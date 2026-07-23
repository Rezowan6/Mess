import { useAuthStore } from "@/modules/auth/store/auth.store";
import { addNotificationToCache } from "@/modules/notification/utils/notification-cache";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { socket } from "@/services/socket";
import { SocketEvent } from "@/shared/constants/socket-event";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const currentTenant = useTenantStore((state) => state.currentTenant);
  const user = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);

      socket.emit(SocketEvent.JOIN, {
        userId: user?.id,
        tenantId: currentTenant?.tenantId,
      });
    });

    const handleNotification = (notification: any) => {
      addNotificationToCache(queryClient, notification);
    };

    socket.off(SocketEvent.NOTIFICATION, handleNotification);
    socket.on(SocketEvent.NOTIFICATION, handleNotification);

    socket.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    return () => {
      socket.off(SocketEvent.NOTIFICATION);
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
};
