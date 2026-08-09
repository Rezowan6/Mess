import { Table } from "@/shared/components/ui/Table";

import { useState } from "react";
import { useFeatureColumns } from "../configs/feature.columns";
import { useFeatures } from "../hooks/useFeatures";
import type { IFeature } from "../types/feature.types";
import { FeatureFormModal } from "./FeatureFormModal";

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

  return (
    <>
      <Table
        columns={columns}
        data={features}
        loading={isPending}
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
