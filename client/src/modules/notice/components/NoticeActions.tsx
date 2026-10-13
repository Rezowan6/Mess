
import type { INotice } from "../types/notice.types";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { RecordActions } from "@/shared/data-display/RecordActions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { formatDate } from "@/shared/utils/date.utils";
import { useDeleteNotice } from "../hooks/useDeleteNotice";

interface Props {
  notice: INotice;
  onEdit: (notice: INotice) => void;
}

export const NoticeActions = ({ notice, onEdit }: Props) => {
  const deleteMutation = useDeleteNotice();

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to delete this notice?"
      details={[
        {
          label: "Title",
          value: notice.title,
          highlight: true,
        },
        {
          label: "Description",
          value: notice.description,
        },
        {
          label: "Created At",
          value: formatDate(notice.createdAt),
        },
      ]}
    />
  );

  return (
    <RecordActions
      updatePermission={PERMISSIONS.NOTICE_UPDATE}
      onEdit={() => onEdit(notice)}
      onDelete={() => deleteMutation.mutateAsync(notice.id)}
      deleteTitle="Delete Notice"
      deleteMessage={deleteMsg}
    />
  );
};
