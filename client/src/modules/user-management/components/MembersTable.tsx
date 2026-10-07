import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { useMemberColumns } from "../configs/member.columns";
import { MEMBER_MESSAGES } from "../configs/member.messages";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";
import { useMembers } from "../hooks/useMembers";
import { MembersTableSkeleton } from "./MembersTableSkeleton";

export const MembersTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useMembers({
    page,
    limit: 10,
    search,
  });

  const members = data?.data ?? [];

  const meta = data?.meta;

  const columns = useMemberColumns();

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} />

      {/* Table */}

      {isPending ? (
        <MembersTableSkeleton />
      ) : (
        <Table
          columns={columns}
          data={members}
          loading={isPending}
          error={isError}
          message={MEMBER_MESSAGES}
          refetch={refetch}
        />
      )}

      {/* Pagination */}

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={handlePage}
        />
      )}
    </div>
  );
};
