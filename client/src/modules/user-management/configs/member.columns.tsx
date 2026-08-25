import type { TableColumn } from "@/shared/components/ui/Table";

import type { ITenantMember } from "../types/userManagement.types";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { MemberActions } from "../components/MemberActions";
import { MemberRole } from "../components/MemberRole";
import { MemberStatus } from "../components/MemberStatus";

export const useMemberColumns = (): TableColumn<ITenantMember>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<ITenantMember>[] = [
    {
      key: "name",
      title: "Name",
      className: "text-xs sm:text-md md:text-md",
      render: (member) => (
        <div className="flex items-center gap-3">
          <Avatar
            size="sm"
            fallback={getAvatarInitial(member.user.avatar ?? member.user.name)}
          />

          <span className="font-medium">
            {member.user.avatar ?? member.user.name}
          </span>
        </div>
      ),
    },

    {
      key: "email",
      title: "Email",
      hideOnMobile: true,
      className: "text-xs",
      render: (member) => member.user.email,
    },

    {
      key: "role",
      title: "Role",
      render: (member) => <MemberRole role={member.role} />,
    },

    {
      key: "status",
      title: "Status",
      render: (member) => <MemberStatus status={member.status} />,
    },
  ];

  if (can(PERMISSIONS.USER_DELETE)) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-20 md:w-auto",
      render: (member) => <MemberActions member={member} />,
    });
  }

  return columns;
};
