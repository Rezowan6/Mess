import type { Role } from "@/shared/constants/roles";

interface Props {
  role: Role;
}

export const MemberRole = ({ role }: Props) => {
  return <span className="badge badge-primary capitalize">{role}</span>;
};
