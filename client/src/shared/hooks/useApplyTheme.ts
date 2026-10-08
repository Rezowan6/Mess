import { useThemeStore } from "@/store/theme.store";
import { useEffect } from "react";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export const useApplyTheme = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia(DARK_QUERY);

    const apply = () => {
      root.dataset.theme =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;

      const brandColor = getComputedStyle(root)
        .getPropertyValue("--theme-brand")
        .trim();

      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", brandColor);
    };

    apply();

    if (theme !== "system") return;

    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
};
