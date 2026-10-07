import { sortByDateDesc } from "@/shared/utils/sort.utils";
import { DepositHistoryTable } from "../components/DepositHistoryTable";
import { DepositHistorySkeleton } from "../components/skeleton/DepositHistorySkeleton";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyDepositHistoryPage = () => {
  const { data, isPending } = useMyProfile();

  if (isPending) {
    return <DepositHistorySkeleton />;
  }
  const deposits = data?.data?.deposits ?? [];

  const sortedDeposits = sortByDateDesc(
    deposits,
    (deposit) => deposit.createdAt,
  );

  return <DepositHistoryTable deposits={sortedDeposits} />;
};
