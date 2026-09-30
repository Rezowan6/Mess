import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { useDeleteRice } from "../hooks/useDeleteRice";
import type { IRice } from "../types/rice.types";

interface Props {
  rice: IRice;
  onEdit: (rice: IRice) => void;
}

export const RiceHistoryAction = ({ rice, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const deleteMutation = useDeleteRice();

  const handleDelete = () =>
    openConfirm({
      title: "Delete Rice Record",
      message: (
        <>
          Are you sure you want to delete{" "}
          <span className="font-bold text-error">
            {Number(rice.quantity).toFixed(2)} kg rice
          </span>
          ?
        </>
      ),
      onConfirm: async () => {
        setLoading(true);

        try {
          await deleteMutation.mutateAsync(rice.id);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="flex items-center gap-2">
      <Button unstyled leftIcon={<Edit />} onClick={() => onEdit(rice)} />

      <Button unstyled leftIcon={<Trash2 />} onClick={handleDelete} />
    </div>
  );
};
