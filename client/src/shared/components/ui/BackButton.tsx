import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export const BackButton = ({ className }: Props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`
        text-info cursor-pointer
        inline-flex items-center gap-1
        border-b border-transparent
        hover:border-info
        transition-all duration-300 ease-in-out
        w-fit
        ${className ?? ""}
      `}
    >
      <ArrowLeft size={14} />
      Back
    </button>
  );
};
