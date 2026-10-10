import { useState } from "react";

import { useDeleteSoldProduct } from "@/modules/sold-product/hooks/useDeleteSoldProduct";
import { useSoldProduct } from "@/modules/sold-product/hooks/useSoldProduct";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";

import { SoldProductFormModal } from "./SoldProductFormModal";

export const SoldProductCard = () => {
  const { data, isPending } = useSoldProduct();
  const deleteSoldProduct = useDeleteSoldProduct();

  const [isOpen, setIsOpen] = useState(false);

  const soldProduct = data?.data;

  const handleCreate = () => {
    setIsOpen(true);
  };

  const handleEdit = () => {
    setIsOpen(true);
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

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete the total sold product amount?"
      details={[
        {
          label: "Total Amount",
          value: `৳ ${Number(soldProduct.totalAmount).toFixed(2)}`,
          highlight: true,
        },
      ]}
    />
  );

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-theme-text">
            Current Session For Total Sold Product Amount
          </p>

          <p className="mt-1 text-2xl font-bold text-theme-text">
            ৳ {Number(soldProduct.totalAmount).toFixed(2)}
          </p>
        </div>

        <RecordActions
          updatePermission={PERMISSIONS.MEAL_SETTING_UPDATE}
          onEdit={handleEdit}
          onDelete={() => deleteSoldProduct.mutateAsync(undefined)}
          deleteTitle="Delete Sold Product Amount"
          deleteMessage={deleteMsg}
        />
      </div>

      <SoldProductFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        soldProduct={soldProduct}
      />
    </>
  );
};
