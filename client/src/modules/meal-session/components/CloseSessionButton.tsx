import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useCloseMealSession } from "../hooks/useCloseMealSession";

interface Props {
  sessionId: number;
}

export const CloseSessionButton = ({ sessionId }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const mutation = useCloseMealSession();

  const handleClose = () => {
    openConfirm({
      title: "Close Meal Session",

      message: "Are you sure you want to close this meal session?",

      confirmText: "Close",

      onConfirm: async () => {
        try {
          setLoading(true);
          await mutation.mutateAsync(sessionId);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Button
      variant="error"
      onClick={handleClose}
      loading={mutation.isPending}
      permission={PERMISSIONS.MEAL_SESSION_CLOSE}
    >
      Close Session
    </Button>
  );
};
