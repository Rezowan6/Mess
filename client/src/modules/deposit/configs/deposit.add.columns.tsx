import type { TableColumn } from "@/shared/components/ui/Table";

import type { ITenantMember } from "@/modules/user-management/types/userManagement.types";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { QuickDepositButtons } from "../components/QuickDepositButtons";

export const useDepositAddColumns = (): TableColumn<ITenantMember>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<ITenantMember>[] = [];

  if (can(PERMISSIONS.DEPOSIT_CREATE)) {
    columns.push({
      key: "id",
      title: "Member ID",
      render: (member) => member.user.id,
    });

    columns.push({
      key: "name",
      title: "Member",
      render: (member) => member.user.name,
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
