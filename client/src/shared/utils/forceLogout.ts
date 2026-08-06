import { useAuthStore } from "@/modules/auth/store/auth.store";

export const forceLogout = () => {
  useAuthStore.getState().logout();

  window.location.replace("/");
};
