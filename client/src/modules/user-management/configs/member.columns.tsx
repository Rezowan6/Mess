import type { TableColumn } from "@/shared/components/ui/Table";

import type { ITenantMember } from "../types/userManagement.types";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { MemberActions } from "../components/MemberActions";
import { MemberRole } from "../components/MemberRole";
import { MemberStatus } from "../components/MemberStatus";

export const useMemberColumns = (): TableColumn<ITenantMember>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<ITenantMember>[] = [
    {
      key: "name",
      title: "Name",
      className: "sm:text-md",
      render: (member) => (
        <MemberAvatar name={member?.user?.name} avatar={member?.user?.avatar} />
      ),
    },

    {
      key: "email",
      title: "Email",
      hideOnMobile: true,
      className: "text-sm",
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
