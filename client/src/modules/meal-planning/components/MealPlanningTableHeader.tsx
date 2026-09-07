import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { formatDate } from "@/shared/utils/date.utils";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { formatDateTime } from "@/shared/utils/time";
import { CalendarDays } from "lucide-react";

interface Props {
  request: {
    status: string;
    date: string;
    updatedAt: string;
    memberName: string;
    avatar: string | null;
  };
}

export const MealPlanningTableHeader = ({ request }: Props) => {
  const { updatedAt, date, memberName, status, avatar } = request;
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar
          src={avatar}
          alt={memberName}
          size="md"
          fallback={getAvatarInitial(memberName)}
        />

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between md:justify-start gap-3">
            <h3 className="truncate text-[15px] font-semibold text-base-content">
              {memberName}
            </h3>

            <Badge variant="soft-warning" size="sm">
              {status}
            </Badge>
          </div>

          <div className="mb-2 mt-2 flex flex-col gap-1 text-xs text-base-content/60 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              <span>{formatDate(date)}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-base-content/50">
              <span>Updated: {formatDateTime(updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
