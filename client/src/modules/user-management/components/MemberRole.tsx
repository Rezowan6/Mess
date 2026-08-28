import { Badge } from "@/shared/components/ui/Badge";
import type { Role } from "@/shared/constants/roles";

interface Props {
  role: Role;
}

export const MemberRole = ({ role }: Props) => {
  const roleVariant = {
    systemOwner: "error",
    admin: "info",
    manager: "accent",
    messMalik: "warning",
    member: "error",
  } as const;

  return (
    <Badge variant={roleVariant[role]} size="sm">
      {role.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
    </Badge>
  );
};
