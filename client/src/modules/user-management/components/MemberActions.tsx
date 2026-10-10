import { Trash2 } from "lucide-react";
import { useMemo, type ChangeEvent } from "react";

import type { ITenantMember } from "../types/userManagement.types";

import { Button } from "@/shared/components/ui/Button";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { PERMISSIONS } from "@/shared/constants/permissions";

import { useConfirmStore } from "@/shared/store/confirm.store";
import { useRemoveMember } from "../hooks/useRemoveMember";

import { Select } from "@/shared/components/ui/Select";
import { ROLES } from "@/shared/constants/roles";
import { ROLE_OPTIONS } from "@/shared/constants/selectOptions";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { useUpdateRole } from "../hooks/useUpdateRole";

interface Props {
  member: ITenantMember;
}

export const MemberActions = ({ member }: Props) => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const { can, role } = useRBAC();

  const updateRole = useUpdateRole();

  const removeMutation = useRemoveMember();

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateRole.mutate({
      id: member.id,

      role: event.target.value,
    });
  };

  const roleOptions = useMemo(() => {
    const options =
      role === ROLES.ADMIN
        ? ROLE_OPTIONS
        : ROLE_OPTIONS.filter((item) => item.value !== ROLES.ADMIN);

    // Current role যেন সবসময় select-এর মধ্যে থাকে
    const currentRoleExists = options.some(
      (item) => String(item.value) === String(member.role),
    );

    if (!currentRoleExists && member.role) {
      return [
        {
          label: member.role,
          value: member.role,
        },
        ...options,
      ];
    }

    return options;
  }, [role, member.role]);

  const memberName = member.user?.name ?? "this member";
  const memberRole = member.role ?? "member";

  const deleteMsg = (
    <RecordDeleteMessage
      description="Are you sure you want to remove this member from the mess?"
      details={[
        {
          label: "Member",
          value: memberName,
          highlight: true,
        },
        {
          label: "Role",
          value: memberRole,
        },
      ]}
    />
  );

  return (
    <div className="flex items-center gap-4">
      {can(PERMISSIONS.USER_UPDATE) && (
        <Select
          value={member.role}
          options={roleOptions}
          onChange={handleRoleChange}
          className="text-xs px-6 sm:px-0 flex items-center justify-center"
        />
      )}

      {can(PERMISSIONS.USER_DELETE) && (
        <Button
          unstyled
          leftIcon={<Trash2 />}
          className="text-theme-danger"
          onClick={() =>
            openConfirm({
              title: "Remove Member",
              message: deleteMsg,
              onConfirm: async () => {
                await removeMutation.mutateAsync(member.id);
              },
            })
          }
        />
      )}
    </div>
  );
};
