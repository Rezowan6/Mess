import { type ReactNode } from "react";
import { DescriptionText } from "../../ui/DescriptionText";

interface Props {
  title: string;
  description: string;
  footer?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}

export const ManagementPage = ({
  title,
  description,
  footer,
  children,
  action,
}: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold">{title}</h1>

          <DescriptionText
            text={description}
            maxWords={6}
            className="text-sm opacity-70"
          />

          {footer}
        </div>

        {action && <div className="w-fit shrink-0">{action}</div>}
      </div>

      <div className="card bg-info/5 shadow">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};
