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
  const setLoading = useConfirmStore((state) => state.setLoading);

  const { can } = useRBAC();

  const deleteMutation = useDeleteDeposit();

  return (
    <div className="flex items-center gap-2">
      {can(PERMISSIONS.DEPOSIT_UPDATE) && (
        <Button unstyled leftIcon={<Edit />} onClick={() => onEdit(deposit)} />
      )}

      {can(PERMISSIONS.DEPOSIT_DELETE) && (
        <Button
          unstyled
          leftIcon={<Trash2 />}
          onClick={() =>
            openConfirm({
              title: "Delete Deposit",
              message: (
                <>
                  Are you sure you want to delete{" "}
                  <strong className="text-success">
                    {deposit.member.name}
                  </strong>{" "}
                  this deposit?
                </>
              ),
              onConfirm: async () => {
                try {
                  setLoading(true);
                  await deleteMutation.mutateAsync(deposit.id);
                } finally {
                  setLoading(false);
                }
              },
            })
          }
        />
      )}
    </div>
  );
};
