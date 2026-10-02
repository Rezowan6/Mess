import { Badge } from "@/shared/components/ui/Badge";

interface Props {
  status: "active" | "inactive" | "pending";
}

export const MemberStatus = ({ status }: Props) => {
  const map = {
    active: "soft-success",
    pending: "soft-warning",
    inactive: "soft-error",
  } as const;

  return (
    <Badge variant={map[status]} size="sm">
      {status}
    </Badge>
  );
};
