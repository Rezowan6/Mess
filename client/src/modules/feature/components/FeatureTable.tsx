import { Table } from "@/shared/components/ui/Table";

import { useState } from "react";
import { useFeatureColumns } from "../configs/feature.columns";
import { FEATURE_MESSAGES } from "../configs/feature.messages";
import { useFeatures } from "../hooks/useFeatures";
import type { IFeature } from "../types/feature.types";
import { FeatureFormModal } from "./FeatureFormModal";
import { FeatureTableSkeleton } from "./FeatureTableSkeleton";

export const FeatureTable = () => {
  const [selectedFeature, setSelectedPlan] = useState<IFeature | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { data, isPending, isError, refetch } = useFeatures();

  const features = data?.data ?? [];

  const handleEdit = (feature: IFeature) => {
    setSelectedPlan(feature);
    setIsEditOpen(true);
  };

  const columns = useFeatureColumns(handleEdit);

  if (isPending) {
    return <FeatureTableSkeleton />;
  }

  return (
    <>
      <Table
        columns={columns}
        data={features}
        loading={isPending}
        message={FEATURE_MESSAGES}
        error={isError}
        refetch={refetch}
      />

      <FeatureFormModal
        isOpen={isEditOpen}
        feature={selectedFeature ?? undefined}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPlan(null);
        }}
      />
    </>
  );
};
