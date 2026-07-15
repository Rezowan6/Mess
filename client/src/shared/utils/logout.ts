import { useAuthStore } from "@/modules/auth/store/auth.store";
import { tokenStorage } from "./token";

export const forceLogout = () => {
  tokenStorage.remove();

  useAuthStore.getState().logout();

  window.location.replace("/login");
};
