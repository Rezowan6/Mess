import clsx from "clsx";
import type { ReactNode } from "react";

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
  return (
    <div className="space-y-6">
      {/* items-start: when the description expands, the action stays at the top */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Same height as the action button, so the title lines up with it */}
          <div className="flex min-h-10 items-center">
            <h1 className={clsx("text-2xl font-bold", titleClassName)}>
              {title}
            </h1>
          </div>

          <DescriptionText
            text={description}
            maxWords={6}
            className="-mt-1 text-sm text-theme-text-muted"
          />

          {footer}
        </div>

        {action && <div className="w-fit shrink-0">{action}</div>}
      </div>

      <div className="space-y-6">{children}</div>
    </div>
  );
};
