import { LogOut } from "lucide-react";

import { useAuthStore } from "@/modules/auth/store/auth.store";

import { Button } from "@/shared/components/ui/Button";

export const SidebarProfile = () => {
  const user = useAuthStore((state) => state.user);

  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="border-t p-4">
      <div className="mb-3">
        <p className="font-semibold">{user?.name}</p>

        <p className="text-sm text-base-content/70">{user?.email}</p>
      </div>

      <Button
        variant="error"
        fullWidth
        leftIcon={<LogOut size={16} />}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};
