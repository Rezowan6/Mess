import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { useDeleteEgg } from "../hooks/useDeleteEgg";
import type { IEgg } from "../types/egg.types";

interface Props {
  egg: IEgg;
  onEdit: (egg: IEgg) => void;
}

export const EggHistoryAction = ({ egg, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const deleteMutation = useDeleteEgg();

  const handleDelete = () =>
    openConfirm({
      title: "Delete Egg Record",
      message: (
        <>
          Are you sure you want to delete{" "}
          <span className="font-bold text-error">{egg.quantity} egg(s)</span>?
        </>
      ),
      onConfirm: async () => {
        setLoading(true);

        try {
          await deleteMutation.mutateAsync({
            id: egg.id,
            memberId: egg.memberId,
          });
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="flex items-center gap-2">
      <Button unstyled leftIcon={<Edit />} onClick={() => onEdit(egg)} />

      <Button unstyled leftIcon={<Trash2 />} onClick={handleDelete} />
    </div>
  );
};
