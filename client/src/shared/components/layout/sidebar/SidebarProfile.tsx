import { LogOut } from "lucide-react";

import { useAuthStore } from "@/modules/auth/store/auth.store";

import { useLogout } from "@/modules/auth/hooks/useLoagout";
import { Button } from "@/shared/components/ui/Button";

export const SidebarProfile = () => {
  const user = useAuthStore((state) => state.user);

  const logoutMutation = useLogout();

  return (
    <div className="border-t p-4 relative">
      <button
        tabIndex={0}
        className="flex items-center justify-center gap-3 px-2 cursor-pointer py-1"
      >
        <div className="avatar placeholder">
          <div className="bg-gradient-success text-primary-content w-10 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold">{user?.name}</p>

          {/* <p className="text-xs text-green-600">{currentTenant?.role ?? ""}</p> */}
        </div>
      </button>

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
