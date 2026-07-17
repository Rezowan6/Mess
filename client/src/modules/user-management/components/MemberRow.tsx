import type { ITenantMember } from "../types/userManagement.types";

import { MemberActions } from "./MemberActions";

interface Props {
  member: ITenantMember;
}

export const MemberRow = ({ member }: Props) => {
  console.log("MemberRow")
  console.log(member)
  return (
    <tr>
      <td>
        <div className="font-semibold">{member.user.name}</div>
      </td>

      <td>{member.user.email}</td>

      <td>
        <span className="badge badge-primary">{member.role}</span>
      </td>

      <td>
        {member.status === "active" ? (
          <span className="badge badge-success">Active</span>
        ) : (
          <span className="badge badge-warning">Pending</span>
        )}
      </td>

      <td>
        <MemberActions member={member} />
      </td>
    </tr>
  );
};
