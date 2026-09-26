import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { Avatar } from "./Avatar";

interface MemberHeaderProps {
  name?: string;
  avatar?: string | null;
  subtitle?: string;
  rightContent?: React.ReactNode;
}

export const MemberHeader = ({
  name = "Unknown Member",
  avatar,
  subtitle,
  rightContent,
}: MemberHeaderProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Avatar
          src={avatar}
          alt={name}
          size="md"
          fallback={getAvatarInitial(name)}
        />

        <div>
          <p className="font-semibold">{name}</p>

          {subtitle && (
            <p className="text-sm text-base-content/60">{subtitle}</p>
          )}
        </div>
      </div>

      {rightContent && <div className="ml-auto">{rightContent}</div>}
    </div>
  );
};
