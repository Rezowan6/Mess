import { DataTableSection } from "@/shared/components/ui/DataTableSection";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import { useState } from "react";
import { useNoticeColumns } from "../configs/notice.columns";
import { NOTICE_MESSAGES } from "../configs/notice.messages";
import { useNotices } from "../hooks/useNotices";
import type { INotice } from "../types/notice.types";
import { AddNoticeModal } from "./AddNoticeModal";
import { NoticeTableSkeleton } from "./NoticeTableSkeleton";

const PAGE_LIMIT = 10;

export const NoticeTable = () => {
  const [selectedNotice, setSelectedNotice] = useState<INotice | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useNotices({
    page,
    limit: PAGE_LIMIT,
    search,
  });

  const handleEdit = (notice: INotice) => {
    setSelectedNotice(notice);
    setIsEditOpen(true);
  };

  const columns = useNoticeColumns(handleEdit);

  return (
    <>
      <DataTableSection
        columns={columns}
        data={data?.data ?? []}
        meta={data?.meta}
        isPending={isPending}
        isError={isError}
        refetch={refetch}
        skeleton={<NoticeTableSkeleton />}
        message={NOTICE_MESSAGES}
        search={search}
        onSearch={handleSearch}
        onPageChange={handlePage}
      />

      <AddNoticeModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedNotice(null);
        }}
        notice={selectedNotice ?? undefined}
      />
    </>
  );
};
