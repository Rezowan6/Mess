import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useOpenMealSession } from "../hooks/useOpenMealSession";

export const OpenMealSessionButton = () => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const mutation = useOpenMealSession();

  const handleOpen = () => {
    openConfirm({
      title: "Open Meal Session",

      message: "Are you sure you want to open a new meal session?",

      confirmText: "Open",

      onConfirm: async () => {
        try {
          setLoading(true);
          await mutation.mutateAsync();
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Button
      variant="success"
      onClick={handleOpen}
      loading={mutation.isPending}
      permission={PERMISSIONS.MEAL_SESSION_OPEN}
    >
      Open Session
    </Button>
  );
};
