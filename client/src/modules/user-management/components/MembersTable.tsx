import { useMembers } from "../hooks/useMembers";

import { Table } from "@/shared/components/ui/Table";
import { memberColumns } from "../constants/member.columns";
import { MEMBER_MESSAGES } from "../constants/member.messages";
import { InviteMemberModal } from "./InviteMemberModal";
import { MembersTableSkeleton } from "./MembersTableSkeleton";

export const MembersTable = () => {
  const { data: members = [], isLoading, isError, refetch } = useMembers();

  if (isLoading) {
    return <MembersTableSkeleton />;
  }

  return (
    <Table
      columns={memberColumns}
      data={members}
      loading={isLoading}
      error={isError}
      message={MEMBER_MESSAGES}
      refetch={refetch}
      action={<InviteMemberModal />}
    />
  );
};
