import { DepositHistoryTable } from "../components/DepositHistoryTable";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyDepositHistoryPage = () => {
  const { data } = useMyProfile();

  const deposits = data?.data?.deposits ?? [];

  return <DepositHistoryTable deposits={deposits} />;
};
