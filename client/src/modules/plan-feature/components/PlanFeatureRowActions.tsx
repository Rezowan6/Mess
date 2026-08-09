import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { useDeletePlanFeature } from "../hooks/useDeletePlanFeature";
import type { IPlanFeature } from "../types/planFeature.types";

interface Props {
  planFeature: IPlanFeature;
  onEdit: (planFeature: IPlanFeature) => void;
}

export const PlanFeatureRowActions = ({
  planFeature,
  onEdit,
}: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const deleteMutation = useDeletePlanFeature();

  return (
    <div className="flex items-center gap-1">
      <Button
        unstyled
        leftIcon={<Edit size={16} />}
        onClick={() => onEdit(planFeature)}
      />

      <Button
        unstyled
        leftIcon={<Trash2 size={16} />}
        onClick={() =>
          openConfirm({
            title: "Delete Plan Feature",
            message: (
              <>
                Are you sure you want to delete this plan feature?
              </>
            ),
            onConfirm: async () => {
              await deleteMutation.mutateAsync(planFeature.id);
            },
          })
        }
      />
    </div>
  );
};