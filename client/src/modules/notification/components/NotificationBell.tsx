import { Bell } from "lucide-react";

import { useState } from "react";

import { useUnreadCount } from "../hooks/useUnreadCount";
import { NotificationDropdown } from "./NotificationDropdown";

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useUnreadCount();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-gradient-accent rounded-full text-text cursor-pointer"
      >
        <Bell size={20} />

        {data?.count! > 0 && (
          <span className="absolute top-1 right-1 badge badge-error badge-xs"></span>
        )}
      </button>

      {isOpen && <NotificationDropdown />}
    </div>
  );
};
