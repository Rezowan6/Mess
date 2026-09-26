import { ChevronLeft } from "lucide-react";
import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { DescriptionText } from "../../ui/DescriptionText";

interface Props {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
  titleClassName?: string;
}

export const ManagementPage = ({
  title,
  description,
  footer,
  children,
  action,
  titleClassName,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-info transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className={`text-2xl font-bold ${titleClassName ?? ""}`}>
              {title}
            </h1>

            <DescriptionText
              text={description}
              maxWords={6}
              className="text-sm opacity-70"
            />

            {footer}
          </div>
        </div>

        {action && <div className="w-fit shrink-0">{action}</div>}
      </div>

      <div className="space-y-6">{children}</div>
    </div>
  );
};
