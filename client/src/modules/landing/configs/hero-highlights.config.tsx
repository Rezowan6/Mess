import { CheckCircle } from "lucide-react";
import type { ReactNode } from "react";

interface HeroHighlight {
  id: number;
  icon: ReactNode;
  title: string;
}

export const heroHighlights: HeroHighlight[] = [
  {
    id: 1,
    icon: <CheckCircle size={18} />,
    title: "Meal Tracking",
  },
  {
    id: 2,
    icon: <CheckCircle size={18} />,
    title: "Expense Management",
  },
  {
    id: 3,
    icon: <CheckCircle size={18} />,
    title: "Deposit System",
  },
  {
    id: 4,
    icon: <CheckCircle className="text-success" size={20} />,
    title: "Monthly Calculation",
  },
];
