import type { ReactNode } from "react";

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
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>

          <p className="text-sm opacity-70">{description}</p>

          {footer}
        </div>

        {action && action}
      </div>

      <div className="card bg-info/5 shadow">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};
