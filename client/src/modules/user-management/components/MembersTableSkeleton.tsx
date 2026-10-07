import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";
import { useMemberTablePermissions } from "../configs/member.columns.permission";

export const MembersTableSkeleton = () => {
  const { canViewActions } = useMemberTablePermissions();

  const columns: TableSkeletonColumn[] = [
    { key: "name", title: "Name", skeleton: "h-4 w-32" },
    {
      key: "email",
      title: "Email",
      skeleton: "h-4 w-48",
      hideOnMobile: true,
    },
    { key: "role", title: "Role", skeleton: "h-7 w-20 rounded-full" },
    { key: "status", title: "Status", skeleton: "h-7 w-24 rounded-full" },
  ];

  if (canViewActions) {
    columns.push({
      key: "actions",
      title: "Actions",
      skeleton: ["h-9 w-20 rounded-theme-lg", "h-9 w-24 rounded-theme-lg"],
    });
  }

  return <TableSkeleton columns={columns} rows={5} />;
};
