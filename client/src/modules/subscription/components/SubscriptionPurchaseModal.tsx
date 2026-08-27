import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { useCreateSubscription } from "../hooks/useCreateSubscription";

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

  const handleSubmit = () => {
    if (!planId) return;

    createMutation.mutate(
      {
        planId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose Subscription Plan">
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
            disabled={!planId}
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};
