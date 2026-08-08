import { Edit, Eye, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { useDeletePlan } from "../hooks/useDeletePlan";
import type { IPlan } from "../types/plan.types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

interface Props {
  plan: IPlan;
  onEdit: (plan: IPlan) => void;
}

export const PlanRowActions = ({ plan, onEdit, }: Props) => {
  const navigate = useNavigate();

  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const deleteMutation = useDeletePlan();

  return (
    <div className="flex items-center gap-1">
      <Button
        unstyled
        leftIcon={<Eye size={16} />}
        onClick={() => navigate(`${ROUTES.PLANS}/${plan.id}`)}
      />
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
