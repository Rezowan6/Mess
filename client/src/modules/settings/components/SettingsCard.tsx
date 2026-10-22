import type { ReactNode } from "react";

import { IconBox } from "@/shared/components/ui/IconBox";

interface SettingsCardProps {
  title: string;
  description?: string;
  actionLink?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
}

export const SettingsCard = ({
  title,
  description,
  actionLink,
  icon,
  children,
}: SettingsCardProps) => {
  return (
    <section className="rounded-theme-md border border-theme-border bg-theme-background shadow-theme-sm">
      <header className="flex flex-col gap-4 border-b border-theme-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          {icon && (
            <IconBox
              icon={icon}
              size="md"
              className="shrink-0"
              bgClassName="bg-theme-info/10"
              textClassName="text-theme-info"
            />
          )}

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-theme-text sm:text-lg">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm leading-5 text-theme-text-muted">
                {description}
              </p>
            )}
          </div>
        </div>

        {actionLink && (
          <div className="shrink-0 sm:ml-auto">{actionLink}</div>
        )}
      </header>

      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
};
