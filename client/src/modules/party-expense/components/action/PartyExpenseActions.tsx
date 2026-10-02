import { Edit, Trash2 } from "lucide-react";


import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { formatDate } from "@/shared/utils/date.utils";
import type { IPartyExpense } from "../../types/partyExpense.types";
import { useDeletePartyExpense } from "../../hooks/useDeletePartyExpense";

interface Props {
  partyExpense: IPartyExpense;
  onEdit: (partyExpense: IPartyExpense) => void;
}

export const PartyExpenseActions = ({ partyExpense, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const deleteMutation = useDeletePartyExpense();

  return (
    <div className="flex items-center gap-2">
      <Button
        unstyled
        leftIcon={<Edit />}
        onClick={() => onEdit(partyExpense)}
      />

      <Button
        unstyled
        leftIcon={<Trash2 />}
        onClick={() =>
          openConfirm({
            title: "Delete Party Expense",
            message: (
              <>
                Are you sure you want to delete{" "}
                <span className="font-bold text-error pr-1">
                  {partyExpense.description}
                </span>
                <span className="text-success">
                  date: {formatDate(partyExpense.date)}
                </span>
                ?
              </>
            ),
            onConfirm: async () => {
              try {
                setLoading(true);
                await deleteMutation.mutateAsync(partyExpense.id);
              } finally {
                setLoading(false);
              }
            },
          })
        }
      />
    </div>
  );
};
