import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { useDeletePlan } from "../hooks/useDeletePlan";
import type { IPlan } from "../types/plan.types";

interface Props {
  plan: IPlan;
  onEdit: (plan: IPlan) => void;
}

export const PlanRowActions = ({ plan, onEdit, }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const deleteMutation = useDeletePlan();
  return (
    <div className="flex items-center gap-2">
      <Button
        unstyled
        leftIcon={<Edit size={16} />}
        onClick={() => onEdit(plan)}
      />

      <Button
        unstyled
        leftIcon={<Trash2 size={16} />}
        onClick={() =>
          openConfirm({
            title: "Delete Deposit",
            message: (
              <>
                Are you sure you want to delete{" "}
                <strong className="text-success">{plan.name}</strong> this plan?
              </>
            ),
            onConfirm: async () => {
              await deleteMutation.mutateAsync(plan.id);
            },
          })
        }
      />
    </div>
  );
};
