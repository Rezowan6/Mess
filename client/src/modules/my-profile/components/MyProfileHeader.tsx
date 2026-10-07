import { BadgeCheck, Hash, Mail, Shield, ShieldAlert } from "lucide-react";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import { Badge } from "@/shared/components/ui/Badge";
import { CopyBadge } from "@/shared/components/ui/CopyBadge";
import { ROLES } from "@/shared/constants/roles";
import { useUpdateAvatar } from "../hooks/useUpdateAvatar";
import { AvatarUploadButton } from "./AvatarUploadButton";

interface Props {
  member: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    isVerified?: boolean;
  };
}

export const MyProfileHeader = ({ member }: Props) => {
  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  const user = useAuthStore((state) => state.user);
  const role = user?.tenantMemberships?.[0]?.role;

  const normalizedRole = role?.toLowerCase();
  const isAdmin =
    normalizedRole === ROLES.ADMIN.toLowerCase() ||
    normalizedRole === ROLES.SYSTEM_OWNER.toLowerCase();

  return (
    <div className="rounded-theme-xl border border-theme-border bg-theme-card p-5 shadow-theme-lg">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <AvatarUploadButton
            avatar={member.avatar}
            name={member.name}
            isPending={isPending}
            onUpload={updateAvatar}
          />
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="truncate text-xl font-bold text-theme-text sm:text-2xl">
            {member.name}
          </h2>

          {/* Email + verification status */}
          <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start">
            <span className="flex min-w-0 items-center gap-1.5 text-sm text-theme-text-muted">
              <Mail size={14} className="shrink-0" />
              <span className="truncate">{member.email}</span>
            </span>

            {member.isVerified ? (
              <Badge variant="soft-success" size="sm" leftIcon={<BadgeCheck />}>
                Verified
              </Badge>
            ) : (
              <Badge
                variant="soft-warning"
                size="sm"
                leftIcon={<ShieldAlert />}
              >
                Unverified
              </Badge>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {role && (
              <Badge
                variant={isAdmin ? "soft-success" : "soft-info"}
                size="sm"
                leftIcon={<Shield />}
              >
                {role}
              </Badge>
            )}

            <CopyBadge
              value={member.id}
              label={`Copy member ID ${member.id}`}
              leftIcon={<Hash />}
            >
              Member ID: {member.id}
            </CopyBadge>
          </div>
        </div>
      </div>
    </div>
  );
};
