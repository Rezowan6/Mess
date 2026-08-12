import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { useMemberColumns } from "../constants/member.columns";
import { MEMBER_MESSAGES } from "../constants/member.messages";

import { useMembersTable } from "../hooks/useMembersTable";
import { MembersTableSkeleton } from "./MembersTableSkeleton";

export const MembersTable = () => {
  const {
    search,
    members,
    meta,
    isPending,
    isError,
    refetch,
    handleSearch,
    handlePage,
  } = useMembersTable();

  const columns = useMemberColumns();

  if (isPending) {
    return <MembersTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} />

      {/* Table */}

      <Table
        columns={columns}
        data={members}
        loading={isPending}
        error={isError}
        message={MEMBER_MESSAGES}
        refetch={refetch}
      />

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
