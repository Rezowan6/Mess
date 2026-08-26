import { OverviewListCard } from "@/shared/components/ui/OverviewListCard";
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
    value: `+৳ ${Number(deposit.amount).toFixed(2)}`,
    icon: Banknote,
    iconClassName: "text-success",
    iconBgClassName: "bg-success/10",
    valueClassName: "text-success",
    description: new Date(deposit.createdAt).toLocaleDateString(),
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
      totalValue={`৳ ${totalDeposit.toFixed(2)}`}
      totalClassName="text-success"
      emptyMessage="No deposits found"
    />
  );
};
