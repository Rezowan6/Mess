import { tokenStorage } from "@/shared/utils/token";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IAuthState, IAuthUser } from "../types/auth.types";

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      accessToken: tokenStorage.get(),
      user: null,

      isAuthenticated: !!tokenStorage.get(),

      isInitialized: false,

      setInitialized: (value: boolean) => {
        set({ isInitialized: value });
      },

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

      setUser: (user: IAuthUser | null) => {
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
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
