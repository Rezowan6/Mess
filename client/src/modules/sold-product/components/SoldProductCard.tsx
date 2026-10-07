import { useState } from "react";

import { useDeleteSoldProduct } from "@/modules/sold-product/hooks/useDeleteSoldProduct";
import { useSoldProduct } from "@/modules/sold-product/hooks/useSoldProduct";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { PERMISSIONS } from "@/shared/constants/permissions";

import { SoldProductFormModal } from "./SoldProductFormModal";

export const SoldProductCard = () => {
  const { data, isPending } = useSoldProduct();

  const deleteSoldProduct = useDeleteSoldProduct();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const soldProduct = data?.data;

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
    deleteSoldProduct.mutate(undefined, {
      onSuccess: () => {
        setIsDeleteOpen(false);
      },
    });
  };

  if (isPending) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (!soldProduct) {
    return (
      <>
        <EmptyState
          title="No Sold Product Amount Configured"
          description="Set the total amount received from sold products for this meal session."
          action={
            <Button
              variant="success"
              permission={PERMISSIONS.MEAL_SETTING_CREATE}
              onClick={handleCreate}
            >
              Add Sold Product
            </Button>
          }
        />

        <SoldProductFormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-theme-text">Total Sold Product Amount</p>

          <p className="mt-1 text-2xl font-bold">
            ৳ {Number(soldProduct.totalAmount).toFixed(2)}
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

      <SoldProductFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        soldProduct={soldProduct}
      />

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Sold Product Amount"
      >
        <p className="text-sm text-base-content/70">
          Are you sure you want to delete the total sold product amount? This
          action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 pt-6">
          <Button
            type="button"
            variant="success"
            onClick={() => setIsDeleteOpen(false)}
            disabled={deleteSoldProduct.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="error"
            loading={deleteSoldProduct.isPending}
            loadingText="Deleting..."
            permission={PERMISSIONS.MEAL_SETTING_DELETE}
            onClick={handleConfirmDelete}
          >
            Delete Sold Product
          </Button>
        </div>
      </Modal>
    </>
  );
};
