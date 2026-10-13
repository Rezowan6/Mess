import { Badge } from "@/shared/components/ui/Badge";
import type { TableColumn } from "@/shared/components/ui/Table";
import { formatDateTime } from "@/shared/utils/time";
import { NoticeActions } from "../components/NoticeActions";
import type { INotice } from "../types/notice.types";
import { useNoticeTablePermissions } from "./notice.column.permission";

export const useNoticeColumns = (
  onEdit: (expense: INotice) => void,
): TableColumn<INotice>[] => {
  const { canViewAction } = useNoticeTablePermissions();
  const columns: TableColumn<INotice>[] = [
    {
      key: "title",
      title: "Title",
      render: (notice) => (
        <Badge variant="soft-success" size="sm">
          {notice.title}
        </Badge>
      ),
    },
    {
      key: "description",
      title: "Description",
      render: (notice) => (
        <p className="max-w-md truncate text-sm text-theme-muted">
          {notice.description}
        </p>
      ),
    },
    {
      key: "createdAt",
      title: "Created At",
      render: (notice) => (
        <Badge size="sm" variant="soft-secondary">
          {formatDateTime(notice.createdAt)}
        </Badge>
      ),
    },
  ];

  if (canViewAction) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-24",
      render: (notice) => <NoticeActions notice={notice} onEdit={onEdit} />,
    });
  }

  return columns;
};
