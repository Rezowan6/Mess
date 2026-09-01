import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { sidebarItems } from "../layout/sidebar/sidebar.config";
import { MobileBottomNavBar } from "./MobileBottomNavBar";
import { MobileMoreMenu } from "./MobileMoreMenu";

export const MobileBottomNav = () => {
  const { can } = useRBAC();

  const location = useLocation();

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  /**
   * Permission filtered menu
   */
  const accessibleMenus = useMemo(() => {
    return sidebarItems.filter(
      (item) => !item.permission || can(item.permission),
    );
  }, [can]);

  /**
   * Primary bottom navigation
   */
  const primaryMenus = accessibleMenus.filter(
    (item) => item.mobile === "primary",
  );

  /**
   * More menu
   */
  const moreMenus = accessibleMenus.filter(
    (item) => item.mobile === "more",
  );

  /**
   * Check whether current route belongs to More menu
   */
  const isMoreActive = moreMenus.some(
    (item) => location.pathname === item.path,
  );

  /**
   * Close More menu after route change
   */
  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  return (
    <>
      <MobileMoreMenu
        menus={moreMenus}
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
      />

      <MobileBottomNavBar
        menus={primaryMenus}
        isMoreActive={isMoreActive}
        isMoreOpen={isMoreOpen}
        onMoreClick={() => setIsMoreOpen((prev) => !prev)}
      />
    </>
  );
};