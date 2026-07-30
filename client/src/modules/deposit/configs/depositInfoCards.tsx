import { CreditCard, User } from "lucide-react";

interface DepositInfoCardConfig {
  key: string;
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconClassName?: string;
  valueClassName?: string;
}

export const getDepositInfoCards = (
  memberName: string,
  totalDeposit: number,
): DepositInfoCardConfig[] => [
  {
    key: "member",
    title: "Member",
    value: memberName,
    icon: <User size={22} />,
    iconClassName: "text-primary",
  },
  {
    key: "totalDeposit",
    title: "Total Deposit",
    value: `৳ ${totalDeposit}`,
    icon: <CreditCard size={22} />,
    iconClassName: "text-success",
    valueClassName: "text-xl font-bold text-success",
  },
];
