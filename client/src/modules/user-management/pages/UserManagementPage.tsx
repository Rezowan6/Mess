export const UserManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>

        <PermissionGuard permission={PERMISSIONS.USER_INVITE}>
          <InviteMemberModal />
        </PermissionGuard>
      </div>

      <MembersTable />
    </div>
  );
};
