import { type ChangeEvent } from "react";
import { Trash2 } from "lucide-react";

import type { ITenantMember } from "../types/userManagement.types";

import { Button } from "@/shared/components/ui/Button";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { PERMISSIONS } from "@/shared/constants/permissions";

import { useUpdateRole } from "../hooks/useUpdateRole";

import { useConfirmStore } from "@/shared/store/confirm.store";
import { useRemoveMember } from "../hooks/useRemoveMember";

interface Props {
  member: ITenantMember;
}

export const MemberActions = ({ member }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const { can } = useRBAC();

  const updateRole = useUpdateRole();

  const removeMutation = useRemoveMember();

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateRole.mutate({
      id: member.id,

      role: event.target.value,
    });
  };

  const memberName = member.user?.name ?? "this member";

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
        <Button
          variant="error"
          size="sm"
          leftIcon={<Trash2 size={14} />}
          onClick={() =>
            openConfirm({
              title: "Remove Member",
              message: (
                <>
                  Are you sure you want to remove{" "}
                  <span className="font-bold text-error">{memberName}</span>{" "}
                  from this mess?
                </>
              ),
              onConfirm: async () => {
                await removeMutation.mutateAsync(member.id);
              },
            })
          }
        >
    Remove
        </Button>
      )}
    </div>
  );
};
