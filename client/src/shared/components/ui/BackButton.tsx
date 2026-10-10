import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

export const BackButton = () => {
  const navigate = useNavigate();
  const { key } = useLocation();

  // React Router sets key to "default" on the first entry (nothing to go back to)
  const canGoBack = key !== "default";

  const handleBack = () => {
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(ROUTES.DASHBOARD, { replace: true }); // adjust to your home route
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-theme-border bg-theme-surface text-theme-brand shadow-theme-sm transition-all duration-200 hover:bg-theme-surface-hover active:scale-95"
    >
      <ArrowLeft size={18} />
    </button>
  );
};
