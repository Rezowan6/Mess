import { create } from "zustand";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  theme: ThemeMode;

  setTheme: (theme: ThemeMode) => void;
}

const STORAGE_KEY = "theme";

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === "light" || saved === "dark" || saved === "system") {
    return saved;
  }

  return "system";
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);

    set({ theme });
  },
}));
