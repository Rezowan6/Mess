import { Badge } from "@/shared/components/ui/Badge";

interface Props {
  status: "active" | "inactive" | "pending";
}

export const MemberStatus = ({ status }: Props) => {
  const map = {
    active: "success",
    pending: "warning",
    inactive: "error",
  } as const;

  return (
    <Badge
      variant={map[status]}
      size="sm"
      className="md:px-3 md:py-1 md:text-sm"
    >
      {status}
    </Badge>
  );
};
