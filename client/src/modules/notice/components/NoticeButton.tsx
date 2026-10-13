import { ROUTES } from "@/shared/constants/routes";
import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";

export const NoticeButton = () => {
  return (
    <Link
      to={ROUTES.NOTICE}
      aria-label="Notices"
      title="Notices"
      className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-theme-border bg-theme-notice-gradient transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none active:scale-95"
    >
      <Megaphone
        className="h-5.5 w-5.5 text-white drop-shadow-sm transition-transform duration-200 group-hover:rotate-[-8deg]"
        strokeWidth={2.4}
        fill="currentColor"
      />
    </Link>
  );
};
