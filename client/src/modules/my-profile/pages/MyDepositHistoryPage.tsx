import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { DepositHistoryTable } from "../components/DepositHistoryTable";
import { useMyProfile } from "../hooks/useMyProfile";
import { BackButton } from "@/shared/components/ui/BackButton";

export const MyDepositHistoryPage = () => {
  const { data } = useMyProfile();

  const deposits = data?.data?.deposits ?? [];

  return (
    <ManagementPage
      title="My Deposit History"
      description="View your deposit records and payment history for this meal session."
      footer={<BackButton/>}
    >
      <DepositHistoryTable deposits={deposits} />
    </ManagementPage>
  );
};
