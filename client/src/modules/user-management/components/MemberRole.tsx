import { Badge } from "@/shared/components/ui/Badge";
import type { Role } from "@/shared/constants/roles";

interface Props {
  role: Role;
}

export const MemberRole = ({ role }: Props) => {
  const roleVariant = {
    systemOwner: "soft-error",
    admin: "soft-info",
    manager: "soft-secondary",
    messMalik: "soft-warning",
    member: "soft-warning",
  } as const;

  return (
    <Badge variant={roleVariant[role]} size="sm">
      {role.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
    </Badge>
  );
};
