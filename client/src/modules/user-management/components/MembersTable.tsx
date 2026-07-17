import { useMembers } from "../hooks/useMembers";

import { MemberRow } from "./MemberRow";

export const MembersTable = () => {
  const { data, isLoading, isError } = useMembers();

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
    return <div className="alert alert-error">Failed to load members</div>;
  }

  const members = data?.data.members ?? [];

  if (!members.length) {
    return <div className="alert">No members found</div>;
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
          {members.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
