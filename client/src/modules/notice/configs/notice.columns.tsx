import { Badge } from "@/shared/components/ui/Badge";
import { DescriptionText } from "@/shared/components/ui/DescriptionText";
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
        <DescriptionText
          text={notice.description}
          maxWords={6}
          className="text-sm text-theme-text-muted"
        />
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
