import type { ChangeEvent } from "react";

import type { ITenantMember } from "../types/userManagement.types";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { PERMISSIONS } from "@/shared/constants/permissions";

import { useUpdateRole } from "../hooks/useUpdateRole";

import { useRemoveMember } from "../hooks/useRemoveMember";

interface Props {
  member: ITenantMember;
}

export const MemberActions = ({ member }: Props) => {
  const { can } = useRBAC();

  const updateRole = useUpdateRole();

  const removeMember = useRemoveMember();

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateRole.mutate({
      id: member.id,

      role: event.target.value,
    });
  };

  const handleRemove = () => {
    const confirm = window.confirm("Are you sure remove this member?");

    if (confirm) {
      removeMember.mutate(member.id);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {can(PERMISSIONS.USER_UPDATE) && (
        <select
          className="select select-bordered select-sm"
          value={member.role}
          onChange={handleRoleChange}
        >
          <option value="admin">Admin</option>

          <option value="manager">Manager</option>

          <option value="member">Member</option>
        </select>
      )}

      {can(PERMISSIONS.USER_DELETE) && (
        <button className="btn btn-error btn-sm" onClick={handleRemove}>
          Remove
        </button>
      )}
    </div>
  );
};
