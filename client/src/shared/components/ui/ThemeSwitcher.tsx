import { useThemeStore, type ThemeMode } from "@/store/theme.store";
import { type ChangeEvent } from "react";
import { Select, type SelectOption } from "./Select";

const THEME_OPTIONS: SelectOption[] = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
  {
    label: "System",
    value: "system",
  },
];

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as ThemeMode);
  };

  return (
    <Select value={theme} options={THEME_OPTIONS} onChange={handleChange} />
  );
};
