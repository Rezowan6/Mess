import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { ActionLink } from "@/shared/components/ui/ActionLink";
import { ROUTES } from "@/shared/constants/routes";
import { CurrentSubscriptionPage } from "./CurrentSubscriptionPage";

export const SubscriptionPage = () => {
  return (
    <ManagementPage
      title="Subscription & Billing"
      description="Manage your subscription, billing history, and payment information."
      footer={
        <ActionLink to={`${ROUTES.SUBSCRIPTION}/payment-history`}>
          Payment history
        </ActionLink>
      }
    >
      <CurrentSubscriptionPage />
    </ManagementPage>
  );
};
