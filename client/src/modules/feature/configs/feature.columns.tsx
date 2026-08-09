import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { Badge } from "@/shared/components/ui/Badge";
import { FeatureRowActions } from "../components/FeatureRowActions";
import type { IFeature } from "../types/feature.types";

export const useFeatureColumns = (
  onEdit: (plan: IFeature) => void,
): TableColumn<IFeature>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IFeature>[] = [
    {
      key: "name",
      title: "Feature Name",
      render: (feature) => feature.name,
    },
    {
      key: "slug",
      title: "Slug",
      render: (feature) => feature.slug,
    },
    {
      key: "description",
      title: "Description",
      hideOnMobile: true,
      render: (feature) => feature.description || "No description",
    },
    {
      key: "status",
      title: "Status",
      render: (feature) => (
        <Badge size="sm" variant={`${feature.isActive ? "success" : "error"}`}>
          {feature.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  if (can(PERMISSIONS.FEATURE_UPDATE) || can(PERMISSIONS.FEATURE_DELETE)) {
    columns.push({
      key: "action",
      title: "Actions",
      className: "w-24",
      render: (feature) => (
        <FeatureRowActions feature={feature} onEdit={onEdit} />
      ),
    });
  }

  return columns;
};
