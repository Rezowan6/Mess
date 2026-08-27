import { Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/constants/routes";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { useCancelSubscription } from "../hooks/useCancelSubscription";
import type { ISubscription } from "../types/subscription.types";

interface Props {
  subscription: ISubscription;
}

export const SubscriptionRowActions = ({ subscription }: Props) => {
  const navigate = useNavigate();
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const cancelMutation = useCancelSubscription();

  return (
    <div className="flex items-center gap-1">
      <Button
        unstyled
        leftIcon={<Eye size={16} />}
        onClick={() => navigate(`${ROUTES.SUBSCRIPTION}/${subscription.id}`)}
      />

      {subscription.status === "active" && (
        <Button
          unstyled
          leftIcon={<X size={16} />}
          onClick={() =>
            openConfirm({
              title: "Cancel Subscription",
              message: <>Are you sure you want to cancel this subscription?</>,
              onConfirm: async () => {
                await cancelMutation.mutateAsync(subscription.id);
              },
            })
          }
        />
      )}
    </div>
  );
};
