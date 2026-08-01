import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { InviteMemberModal } from "../components/InviteMemberModal";
import { MembersTable } from "../components/MembersTable";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const UserManagementPage = () => {
  return (
    <PermissionGuard permission={PERMISSIONS.USER_VIEW}>
      <ManagementPage
        title="User Management"
        description="Manage mess members and permissions"
        action={<InviteMemberModal />}
      >
        <MembersTable />
      </ManagementPage>
    </PermissionGuard>
  );
};
