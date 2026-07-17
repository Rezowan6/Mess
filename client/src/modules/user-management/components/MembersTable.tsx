import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { useMembers } from "../hooks/useMembers";

import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { InviteMemberModal } from "./InviteMemberModal";
import { MemberRow } from "./MemberRow";

export const MembersTable = () => {
  const { data: members = [], isLoading, isError, refetch } = useMembers();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-12 animate-pulse rounded bg-base-300"
          ></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to Load Members"
        description="Unable to fetch member list. Please try again."
        onRetry={refetch}
      />
    );
  }

  if (!members.length) {
    return (
      <EmptyState
        title="No Members Found"
        description="There are no members in this mess yet."
        action={<InviteMemberModal />}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

            <th>Status</th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {members?.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
