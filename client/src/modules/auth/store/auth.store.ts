import { tokenStorage } from "@/shared/utils/token";
import { create } from "zustand";
import type { IAuthState, IUser } from "../types/auth.types";

export const useAuthStore = create<IAuthState>((set) => ({
  accessToken: tokenStorage.get(),
  user: null,

  isAuthenticated: !!tokenStorage.get(),

  setAccessToken: (token) => {
    if (token) {
      tokenStorage.set(token);
    } else {
      tokenStorage.remove();
    }

    set({
      accessToken: token,
      isAuthenticated: !!token,
    });
  },

  setUser: (user: IUser | null) => {
    set({ user });
  },

  logout: () => {
    tokenStorage.remove();

    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
