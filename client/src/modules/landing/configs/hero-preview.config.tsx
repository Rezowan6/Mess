import {
  Banknote,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";

export interface HeroPreviewCardItem {
  id: number;
  title: string;
  value: string;
  icon: ReactNode;
  iconClassName: string;
  valueClassName: string;
}

export const heroPreviewConfig: HeroPreviewCardItem[] = [
  {
    id: 1,
    title: "Total Meals",
    value: "245",
    icon: <Utensils size={22} />,
    iconClassName: "text-primary",
    valueClassName: "text-2xl font-bold",
  },

  {
    id: 2,
    title: "Deposit",
    value: "৳25,000",
    icon: <Banknote size={22} />,
    iconClassName: "text-success",
    valueClassName: "text-2xl font-bold",
  },

  {
    id: 3,
    title: "Members",
    value: "18",
    icon: <Users size={22} />,
    iconClassName: "text-warning",
    valueClassName: "text-2xl font-bold",
  },

  {
    id: 4,
    title: "Balance",
    value: "৳5,400",
    icon: <Wallet size={22} />,
    iconClassName: "text-info",
    valueClassName: "text-2xl font-bold",
  },
];