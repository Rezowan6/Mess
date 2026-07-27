import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { useOpenMealSession } from "../hooks/useOpenMealSession";

export const OpenMealSessionButton = () => {
  const { openConfirm } = useConfirmStore();

  const mutation = useOpenMealSession();

  const handleOpen = () => {
    openConfirm({
      title: "Open Meal Session",

      message: "Are you sure you want to open a new meal session?",

      confirmText: "Open",

      onConfirm: async () => {
        await mutation.mutateAsync();
      },
    });
  };

  return (
    <Button variant="success" onClick={handleOpen} loading={mutation.isPending}>
      Open Session
    </Button>
  );
};
