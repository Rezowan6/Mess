import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export const NoticeButton = () => {
  return (
    <Link
      to="/notices"
      aria-label="Notices"
      title="Notices"
      className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-300 bg-linear-to-br from-amber-400 via-orange-500 to-red-500 shadow-md shadow-orange-200/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-300/60 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 active:scale-95"
    >
      <Megaphone
        className="h-5.5 w-5.5 text-white drop-shadow-sm transition-transform duration-200 group-hover:rotate-[-8deg]"
        strokeWidth={2.4}
        fill="currentColor"
      />

      {/* Notification indicator */}
      <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-600 shadow-sm" />
    </Link>
  );
};
