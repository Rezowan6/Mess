
import { Edit, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";

import { useDeleteFeature } from "../hooks/useDeleteFeature";
import type { IFeature } from "../types/feature.types";

interface Props {
  feature: IFeature;
  onEdit: (feature: IFeature) => void;
}

export const FeatureRowActions = ({ feature, onEdit }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const deleteMutation = useDeleteFeature();

  return (
    <div className="flex items-center gap-1">
      <Button
        unstyled
        leftIcon={<Edit size={16} />}
        onClick={() => onEdit(feature)}
      />

      <Button
        unstyled
        leftIcon={<Trash2 size={16} />}
        onClick={() =>
          openConfirm({
            title: "Delete Feature",
            message: (
              <>
                Are you sure you want to delete{" "}
                <strong className="text-success">{feature.name}</strong> this
                feature?
              </>
            ),
            onConfirm: async () => {
              await deleteMutation.mutateAsync(feature.id);
            },
          })
        }
      />
    </div>
  );
};
