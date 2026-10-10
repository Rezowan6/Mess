import { useState } from "react";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

import { AddButton } from "@/shared/components/ui/Button/AddButton";
import { InviteMemberModal } from "../components/InviteMemberModal";
import { MembersTable } from "../components/MembersTable";

export const UserManagementPage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <PermissionGuard permission={PERMISSIONS.USER_VIEW}>
      <ManagementPage
        title="User Management"
        description="Manage mess members and permissions"
        action={
          <AddButton
            permission={PERMISSIONS.USER_INVITE}
            onClick={() => setIsInviteOpen(true)}
            label="Invite"
          />
        }
      >
        <MembersTable />

        <InviteMemberModal
          isOpen={isInviteOpen}
          onClose={() => setIsInviteOpen(false)}
        />
      </ManagementPage>
    </PermissionGuard>
  );
};
