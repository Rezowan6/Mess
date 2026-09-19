import { sortByDateDesc } from "@/shared/utils/sort.utils";
import { DepositHistoryTable } from "../components/DepositHistoryTable";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyDepositHistoryPage = () => {
  const { data } = useMyProfile();

  const deposits = data?.data?.deposits ?? [];

  const sortedDeposits = sortByDateDesc(deposits, (deposit) => deposit.createdAt)

  return <DepositHistoryTable deposits={sortedDeposits} />;
};
