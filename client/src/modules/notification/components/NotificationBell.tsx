import { Bell } from "lucide-react";

import { useState } from "react";

import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { useUnreadCount } from "../hooks/useUnreadCount";
import { NotificationDropdown } from "./NotificationDropdown";

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useUnreadCount();

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const dropdownRef = useClickOutside<HTMLDivElement>(closeDropdown);

  const count: number = data?.data?.count || 0;

  return (
    <div ref={dropdownRef} className="static sm:relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-accent hover:bg-gradient-success focus:bg-gradient-success cursor-pointer transition-all duration-300 text-white"
      >
        <Bell size={20} />

        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      <NotificationDropdown isOpen={isOpen} />
    </div>
  );
};
