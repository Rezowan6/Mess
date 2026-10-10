import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  // Re-render on every navigation so the history index is read again
  useLocation();

  const canGoBack = (window.history.state?.idx ?? 0) > 0;

  if (!canGoBack) return null;

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-theme-border bg-theme-surface text-theme-brand shadow-theme-sm transition-all duration-200 hover:bg-theme-surface-hover hover:text-theme-brand active:scale-95"
    >
      <ArrowLeft size={18} />
    </button>
  );
};
