import { InviteMemberModal } from "../components/InviteMemberModal";
import { MembersTable } from "../components/MembersTable";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

export const UserManagementPage = () => {
  return (
    <PermissionGuard permission={PERMISSIONS.USER_VIEW}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">User Management</h1>

            <p className="text-sm opacity-70">
              Manage mess members and permissions
            </p>
          </div>

          <InviteMemberModal />
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <MembersTable />
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
};
