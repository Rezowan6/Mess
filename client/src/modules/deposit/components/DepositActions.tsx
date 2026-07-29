import { Edit, Trash2 } from "lucide-react";

import type { IDeposit } from "../types/deposit.types";

import { Button } from "@/shared/components/ui/Button";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { PERMISSIONS } from "@/shared/constants/permissions";

import { useConfirmStore } from "@/shared/store/confirm.store";

import { useDeleteDeposit } from "../hooks/useDeleteDeposit";

interface Props {
  deposit: IDeposit;

  onEdit: (deposit: IDeposit) => void;
}

export const DepositActions = ({ deposit, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const { can } = useRBAC();

  const deleteMutation = useDeleteDeposit();

  return (
    <div className="flex items-center gap-2">
      {can(PERMISSIONS.DEPOSIT_UPDATE) && (
        <Button
          variant="success"
          size="sm"
          leftIcon={<Edit size={14} />}
          className="px-2 sm:px-3 h-8"
          onClick={() => onEdit(deposit)}
        >
          <span className="hidden sm:inline">Edit</span>
        </Button>
      )}

      {can(PERMISSIONS.DEPOSIT_DELETE) && (
        <Button
          variant="error"
          size="sm"
          leftIcon={<Trash2 size={14} />}
          className="px-2 sm:px-3 h-8"
          onClick={() =>
            openConfirm({
              title: "Delete Deposit",
              message: <>Are you sure you want to delete this deposit?</>,
              onConfirm: async () => {
                await deleteMutation.mutateAsync(deposit.id);
              },
            })
          }
        >
          <span className="hidden sm:inline">Delete</span>
        </Button>
      )}
    </div>
  );
};
