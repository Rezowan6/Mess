import { useState } from "react";

import { useDeleteEggRate } from "@/modules/egg-rate/hooks/useDeleteEggRate";
import { useEggRate } from "@/modules/egg-rate/hooks/useEggRate";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";

import { EggRateFormModal } from "./EggRateFormModal";

export const EggRateCard = () => {
  const { data, isPending } = useEggRate();
  const deleteEggRate = useDeleteEggRate();

  const [isOpen, setIsOpen] = useState(false);

  const eggRate = data?.data;

  if (isPending) {
    return <Skeleton className="h-10 w-full" />;
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
              onClick={() => setIsOpen(true)}
            >
              Set Egg Rate
            </Button>
          }
        />

        <EggRateFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete the current egg rate?"
      details={[
        {
          label: "Egg Rate",
          value: `৳ ${Number(eggRate.rate).toFixed(2)}`,
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
            Current Session For Egg Rate
          </p>

          <p className="mt-1 text-2xl font-bold text-theme-text">
            ৳ {Number(eggRate.rate).toFixed(2)}
            <span className="ml-1 text-sm font-normal text-theme-text-muted">
              / egg
            </span>
          </p>
        </div>

        <RecordActions
          updatePermission={PERMISSIONS.MEAL_SETTING_UPDATE}
          onEdit={() => setIsOpen(true)}
          onDelete={() => deleteEggRate.mutateAsync(undefined)}
          deleteTitle="Delete Egg Rate"
          deleteMessage={deleteMsg}
        />
      </div>

      <EggRateFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eggRate={eggRate}
      />
    </>
  );
};
