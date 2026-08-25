import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";

interface Props {
  name?: string;
  avatar?: string | null;
  size?: "xs" | "sm" | "md" | "lg";
  showName?: boolean;
  className?: string;
}

export const MemberAvatar = ({
  name = "",
  avatar,
  size = "sm",
  showName = true,
  className = "",
}: Props) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Avatar size={size} fallback={getAvatarInitial(name ?? "", avatar)} />

      {showName && <span className="font-medium">{name ?? ""}</span>}
    </div>
  );
};
