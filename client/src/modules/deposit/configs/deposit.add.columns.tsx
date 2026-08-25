import type { TableColumn } from "@/shared/components/ui/Table";

import type { ITenantMember } from "@/modules/user-management/types/userManagement.types";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { QuickDepositButtons } from "../components/QuickDepositButtons";

export const useDepositAddColumns = (): TableColumn<ITenantMember>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<ITenantMember>[] = [];

  if (can(PERMISSIONS.DEPOSIT_CREATE)) {
    columns.push({
      key: "name",
      title: "Member",
      render: (member) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              fallback={getAvatarInitial(
                member?.user?.name ?? "",
                member?.user?.avatar,
              )}
            />

            <span className="font-medium">{member?.user?.name ?? ""}</span>
          </div>
        );
      },
    });
    columns.push({
      key: "id",
      title: "Member ID",
      render: (member) => member.user.id,
    });

    columns.push({
      key: "deposit",
      title: "Add Deposit",
      render: (member, _, actions) => (
        <QuickDepositButtons
          member={member}
          onAddDeposit={actions!.onAddDeposit!}
        />
      ),
    });
  }

  return columns;
};
