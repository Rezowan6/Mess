import { Bell } from "lucide-react";

import { ROUTES } from "@/shared/constants/routes";
import { Link } from "react-router-dom";
import { useUnreadCount } from "../hooks/useUnreadCount";

export const NotificationBell = () => {
  const { data } = useUnreadCount();

  const count: number = data?.data?.count || 0;

  return (
    <div className="static sm:relative">
      <Link
        to={ROUTES.NOTIFICATIONS}
        className="relative flex h-8 w-8 items-center justify-center cursor-pointer transition-all duration-300 text-white"
      >
        <Bell size={22} />

        {count > 0 && (
          <span className="absolute -top-2 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </Link>
    </div>
  );
};
