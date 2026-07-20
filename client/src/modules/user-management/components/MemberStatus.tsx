interface Props {
  status: "active" | "inactive" | "pending";
}

export const MemberStatus = ({ status }: Props) => {
  const badgeClass = {
    active: "badge-success text-black",
    pending: "badge-warning",
    inactive: "badge-error",
  };

  return <span className={`badge ${badgeClass[status]}`}>{status}</span>;
};
