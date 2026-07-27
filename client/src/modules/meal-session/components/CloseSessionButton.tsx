import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { useCloseMealSession } from "../hooks/useCloseMealSession";

interface Props {
  sessionId: number;
}

export const CloseSessionButton = ({ sessionId }: Props) => {
  const { openConfirm } = useConfirmStore();

  const mutation = useCloseMealSession();

  const handleClose = () => {
    openConfirm({
      title: "Close Meal Session",

      message: "Are you sure you want to close this meal session?",

      confirmText: "Close",

      onConfirm: async () => {
        await mutation.mutateAsync(sessionId);
      },
    });
  };

  return (
    <Button variant="error" onClick={handleClose} loading={mutation.isPending}>
      Close Session
    </Button>
  );
};
