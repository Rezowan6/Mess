import { X } from "lucide-react";
import { useLocation } from "react-router-dom";

import { useSidebarStore } from "@/store/sidebar.store";

import { useEffect } from "react";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarProfile } from "./SidebarProfile";

export const MobileSidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);

  const close = useSidebarStore((state) => state.close);

  const location = useLocation();

  /**
   * close drawer after route change
   */
  useEffect(() => {
    if (isOpen) {
      close();
    }
  }, [location.pathname]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}

      <div onClick={close} className="fixed inset-0 z-40 lg:hidden" />

      {/* Drawer */}

      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          flex
          h-full
          w-64
          flex-col
          bg-base-100
          shadow-xl
          lg:hidden
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">Mess SaaS</h2>

          <button className="btn btn-ghost btn-square" onClick={close}>
            <X size={20} />
          </button>
        </div>

        {/* Menu */}

        <div className="flex-1 overflow-y-auto">
          <SidebarMenu />
        </div>

        {/* Profile */}

        <SidebarProfile />
      </aside>
    </>
  );
};
