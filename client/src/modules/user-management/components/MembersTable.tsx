import { useMembers } from "../hooks/useMembers";

import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";
import { useState } from "react";
import { memberColumns } from "../constants/member.columns";
import { MEMBER_MESSAGES } from "../constants/member.messages";
import { useDebounce } from "../hooks/useDebounce";
import { InviteMemberModal } from "./InviteMemberModal";
import { MembersTableSkeleton } from "./MembersTableSkeleton";

export const MembersTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const {
    data: members = [],
    isLoading,
    isError,
    refetch,
  } = useMembers({ page, limit: 10, search: debouncedSearch });

  if (isLoading) {
    return <MembersTableSkeleton />;
  }

  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      
      <Table
        columns={memberColumns}
        data={members}
        loading={isLoading}
        error={isError}
        message={MEMBER_MESSAGES}
        refetch={refetch}
        action={<InviteMemberModal />}
      />
    </>
  );
};
