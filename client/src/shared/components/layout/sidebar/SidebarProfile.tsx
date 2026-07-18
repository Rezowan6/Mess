import { LogOut } from "lucide-react";

import { useAuthStore } from "@/modules/auth/store/auth.store";

import { useLogout } from "@/modules/auth/hooks/useLoagout";
import { Button } from "@/shared/components/ui/Button";

export const SidebarProfile = () => {
  const user = useAuthStore((state) => state.user);

  const logoutMutation = useLogout();

  return (
    <div className="border-t p-4">
      <div className="mb-3">
        <p className="font-semibold">{user?.name}</p>

        <p className="text-sm text-base-content/70">{user?.email}</p>
      </div>

      <Button
        variant="error"
        fullWidth
        loading={logoutMutation.isPending}
        loadingText="Processing..."
        leftIcon={<LogOut size={16} />}
        onClick={() => logoutMutation.mutate()}
      >
        Logout
      </Button>
    </div>
  );
};
