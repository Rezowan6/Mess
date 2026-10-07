import { useState } from "react";

import { useDeleteEggRate } from "@/modules/egg-rate/hooks/useDeleteEggRate";
import { useEggRate } from "@/modules/egg-rate/hooks/useEggRate";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { PERMISSIONS } from "@/shared/constants/permissions";

import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { EggRateFormModal } from "./EggRateFormModal";

export const EggRateCard = () => {
  const { data, isPending } = useEggRate();

  const deleteEggRate = useDeleteEggRate();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const eggRate = data?.data;

  const handleCreate = () => {
    setIsOpen(true);
  };

  const handleEdit = () => {
    setIsOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteEggRate.mutate(undefined, {
      onSuccess: () => {
        setIsDeleteOpen(false);
      },
    });
  };

  if (isPending) {
    return <Skeleton className="w-full h-10" />;
  }

  if (!eggRate) {
    return (
      <>
        <EmptyState
          title="No Egg Rate Configured"
          description="Set an egg rate for this meal session."
          action={
            <Button
              variant="success"
              permission={PERMISSIONS.MEAL_SETTING_CREATE}
              onClick={handleCreate}
            >
              Set Egg Rate
            </Button>
          }
        />

        <EggRateFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-theme-text">Current Egg Rate</p>

          <p className="mt-1 text-2xl font-bold">
            ৳ {Number(eggRate.rate).toFixed(2)}
            <span className="ml-1 text-sm font-normal text-theme-text-muted">/ egg</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            permission={PERMISSIONS.MEAL_SETTING_UPDATE}
            onClick={handleEdit}
          >
            Edit
          </Button>

          <Button
            variant="error"
            permission={PERMISSIONS.MEAL_SETTING_DELETE}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      <EggRateFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eggRate={eggRate}
      />

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Egg Rate"
      >
        <p className="text-sm text-base-content/70">
          Are you sure you want to delete the current egg rate? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-2 pt-6">
          <Button
            type="button"
            variant="success"
            onClick={() => setIsDeleteOpen(false)}
            disabled={deleteEggRate.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="error"
            loading={deleteEggRate.isPending}
            loadingText="Deleting..."
            permission={PERMISSIONS.MEAL_SETTING_DELETE}
            onClick={handleConfirmDelete}
          >
            Delete Egg Rate
          </Button>
        </div>
      </Modal>
    </>
  );
};
