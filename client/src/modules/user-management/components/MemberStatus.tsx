import { Badge } from "@/shared/components/ui/Badge";
import { toTitleCase } from "@/shared/utils/format.utils";

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
      {toTitleCase(status)}
    </Badge>
  );
};
