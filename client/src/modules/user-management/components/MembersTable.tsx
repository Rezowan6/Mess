import { useSearchParams } from "react-router-dom";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";
import { useDebounce } from "@/shared/hooks/useDebounce";

import { memberColumns } from "../constants/member.columns";
import { MEMBER_MESSAGES } from "../constants/member.messages";
import { useMembers } from "../hooks/useMembers";
import { InviteMemberModal } from "./InviteMemberModal";
import { MembersTableSkeleton } from "./MembersTableSkeleton";

export const MembersTable = () => {
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page")) || 1;

  const search = params.get("search") || "";

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError, refetch } = useMembers({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  const members = data?.data ?? [];

  const meta = data?.meta;

  const handleSerarch = (value: string) => {
    setParams({
      page: "1",
      search: value,
    });
  };

  const handlePage = (page: number) => {
    setParams({
      page: String(page),
      search,
    });
  };

  if (isLoading) {
    return <MembersTableSkeleton />;
  }

  return (
    <>
      <SearchInput value={search} onChange={handleSerarch} />

      <Table
        columns={memberColumns}
        data={members}
        loading={isLoading}
        error={isError}
        message={MEMBER_MESSAGES}
        refetch={refetch}
        action={<InviteMemberModal />}
      />

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={handlePage}
        />
      )}
    </>
  );
};
