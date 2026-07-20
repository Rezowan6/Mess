import { useEffect } from "react";

import { useThemeStore } from "@/store/theme.store";

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      if (theme === "system") {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;

        root.setAttribute("data-theme", prefersDark ? "dark" : "light");

        return;
      }

      root.setAttribute("data-theme", theme);
    };

    applyTheme();

    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    media.addEventListener("change", applyTheme);

    return () => {
      media.removeEventListener("change", applyTheme);
    };
  }, [theme]);

  return children;
};
