import { OverviewListCard } from "@/shared/components/ui/OverviewListCard";
import { formatDate } from "@/shared/utils/date.utils";
import { Banknote } from "lucide-react";

interface Deposit {
  id: number;
  amount: number;
  paymentMethod: string;
  createdAt: string;
}

interface Props {
  deposits: Deposit[];
}

export const MyProfileRecentDeposits = ({ deposits }: Props) => {
  const items = deposits.slice(0, 5).map((deposit) => ({
    id: deposit.id,
    label: deposit.paymentMethod,
    amount: Number(deposit.amount),
    prefix: "+৳ ",
    icon: Banknote,
    iconClassName: "text-theme-success",
    iconBgClassName: "bg-theme-success/10",
    valueClassName: "text-theme-success",
    description: formatDate(deposit.createdAt),
  }));

  const totalDeposit = deposits.reduce(
    (total, deposit) => total + Number(deposit.amount),
    0,
  );

  return (
    <OverviewListCard
      title="Recent Deposits"
      description="Your latest deposit history"
      items={items}
      totalLabel="Total Deposit"
      totalAmount={totalDeposit}
      totalPrefix="৳ "
      totalClassName="text-theme-success"
      emptyMessage="No deposits found"
    />
  );
};
