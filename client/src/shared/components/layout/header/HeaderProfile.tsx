import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

import { useLogout } from "@/modules/auth/hooks/useLoagout";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { ROUTES } from "@/shared/constants/routes";

export const HeaderProfile = () => {
  const user = useAuthStore((state) => state.user);
  const currentTenant = useTenantStore((state) => state.currentTenant);

  const logoutMutation = useLogout();

  return (
    <div className="dropdown dropdown-end">
      {/* Trigger */}

      <button tabIndex={0} className="btn bg-background gap-3 px-2">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content w-10 rounded-full">
            <span className="text-sm font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold">{user?.name}</p>

          <p className="text-xs text-green-600">{currentTenant?.role ?? ""}</p>
        </div>

        <ChevronDown size={18} />
      </button>

      {/* Dropdown */}

      <ul
        tabIndex={0}
        className="
          dropdown-content
          menu
          z-50
          mt-3
          w-64
          rounded-box
          border
          bg-base-100
          p-2
          shadow-lg
        "
      >
        {/* User Info */}

        <li className="pointer-events-none mb-2 border-b pb-2">
          <div className="flex flex-col gap-0 items-start">
            <p className="font-semibold">{user?.name}</p>
            <span className="text-xs text-green-600">{currentTenant?.role ?? ""}</span>

            <p className="text-xs text-base-content/60">{user?.email}</p>
          </div>
        </li>

        {/* Profile */}

        <li>
          <Link to={ROUTES.DASHBOARD}>
            <User size={16} />
            Profile
          </Link>
        </li>

        {/* Settings */}

        <li>
          <Link to={ROUTES.SETTINGS}>
            <Settings size={16} />
            Settings
          </Link>
        </li>

        {/* Logout */}

        <li>
          <button
            disabled={logoutMutation.isPending}
            onClick={() => logoutMutation.mutate()}
            className="text-error"
          >
            <LogOut size={16} />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
