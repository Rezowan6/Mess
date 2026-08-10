import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { BackButton } from "@/shared/components/ui/BackButton";
import { PaymentHistoryTable } from "../components/PaymentHistoryTable";

export const PaymentHistoryPage = () => {
  return (
    <ManagementPage
      title="Payment History"
      description="View all subscription payments and transaction details."
      footer={<BackButton />}
    >
      <PaymentHistoryTable />
    </ManagementPage>
  );
};
