import type { TableColumn } from "@/shared/components/ui/Table";

import type { ITenantMember } from "../types/userManagement.types";

import { MemberActions } from "../components/MemberActions";
import { MemberRole } from "../components/MemberRole";
import { MemberStatus } from "../components/MemberStatus";

export const memberColumns: TableColumn<ITenantMember>[] = [
  {
    key: "name",
    title: "Name",

    render: (member) => <div className="font-semibold">{member.user.name}</div>,
  },

  {
    key: "email",
    title: "Email",

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

  {
    key: "actions",
    title: "Actions",

    render: (member) => <MemberActions member={member} />,
  },
];
