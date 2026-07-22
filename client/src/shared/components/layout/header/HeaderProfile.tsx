import { ChevronDown, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useLogout } from "@/modules/auth/hooks/useLoagout";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { HeaderMenuItem } from "./header.constance";

export const HeaderProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = useAuthStore((state) => state.user);
  const currentTenant = useTenantStore((state) => state.currentTenant);

  const logoutMutation = useLogout();

  const handleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}

      <button
        onClick={handleDropDown}
        tabIndex={0}
        className="flex items-center justify-center gap-3 px-2 cursor-pointer border border-success py-1 rounded-md"
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

          <p className="text-xs text-green-600">{currentTenant?.role ?? ""}</p>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}


        <ul
          tabIndex={0}
          className={`
          absolute right-0 top-full
          z-50
          mt-2
          w-64
          rounded-box
          border
          bg-base-100
          p-2
          shadow-lg
          transition-all duration-300 ease-in-out
          ${isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}
          `}
        >
          {/* User Info */}

          <li className="pointer-events-none mb-2 border-b pb-2">
            <div className="flex flex-col gap-0 items-start">
              <p className="font-semibold">{user?.name}</p>
              <span className="text-xs text-green-600">
                {currentTenant?.role ?? ""}
              </span>

              <p className="text-xs text-base-content/60">{user?.email}</p>
            </div>
          </li>

          {HeaderMenuItem.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link to={item.path} onClick={closeDropdown} className="flex items-center gap-1 py-2 hover:bg-background rounded-sm">
                  <Icon size={16} className="text-success" />
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Logout */}

          <li>
            <button
              disabled={logoutMutation.isPending}
              onClick={() => {
                closeDropdown();
                logoutMutation.mutate();
              }}
              className="text-error w-full flex items-center gap-1 py-2 hover:bg-background rounded-sm cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          </li>
        </ul>
    </div>
  );
};
