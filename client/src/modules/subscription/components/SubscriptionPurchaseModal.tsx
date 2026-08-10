import { useCreateSubscription } from "../hooks/useCreateSubscription";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  planId?: number;
}

export const SubscriptionPurchaseModal = ({
  isOpen,
  onClose,
  planId,
}: Props) => {
  const createMutation = useCreateSubscription();

  const [selectedPlanId, setSelectedPlanId] = useState<number | undefined>(
    planId,
  );

  const handleSubmit = () => {
    if (!selectedPlanId) return;

    createMutation.mutate(
      {
        planId: selectedPlanId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose Subscription Plan"
    >
      <div className="space-y-4">
        <p className="text-sm opacity-70">
          Select a plan to start your subscription.
        </p>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="error" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="button"
            variant="success"
            onClick={handleSubmit}
            loading={createMutation.isPending}
            loadingText="Creating..."
            disabled={!selectedPlanId}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};