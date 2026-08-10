import { X } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { useCancelSubscription } from "../hooks/useCancelSubscription";
import type { ISubscription } from "../types/subscription.types";

interface Props {
  subscription: ISubscription;
}

export const SubscriptionActions = ({ subscription }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const cancelMutation = useCancelSubscription();

  if (subscription.status !== "active") {
    return null;
  }

  const handleCancel = () => {
    openConfirm({
      title: "Cancel Subscription",
      message: <>Are you sure you want to cancel this subscription?</>,
      onConfirm: async () => {
        await cancelMutation.mutateAsync(subscription.id);
      },
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="error"
        leftIcon={<X size={16} />}
        onClick={handleCancel}
        loading={cancelMutation.isPending}
        loadingText="Cancelling..."
      >
        Cancel Subscription
      </Button>
    </div>
  );
};
