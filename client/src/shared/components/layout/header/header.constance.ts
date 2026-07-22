import { ROUTES } from "@/shared/constants/routes";
import { Settings, User, type LucideIcon } from "lucide-react";

interface IHeaderMenu {
  path: string;
  label: string;
  icon: LucideIcon;
}

export const HeaderMenuItem: IHeaderMenu[] = [
  {
    path: ROUTES.DASHBOARD,
    label: "Profile",
    icon: User,
  },
  {
    path: ROUTES.SETTINGS,
    label: "Settings",
    icon: Settings,
  },
];
