import { Badge } from "@/shared/components/ui/Badge";
import type { Role } from "@/shared/constants/roles";

interface Props {
  role: Role;
}

export const MemberRole = ({ role }: Props) => {
  const roleVariant = {
    system_owner: "error",
    admin: "success",
    manager: "info",
    mess_malik: "warning",
    member: "secondary",
  } as const;

  return (
    <Badge variant={roleVariant[role]} size="md">
      {role.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
    </Badge>
  );
};
