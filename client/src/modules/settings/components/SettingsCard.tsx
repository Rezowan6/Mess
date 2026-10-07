import { IconBox } from "@/shared/components/ui/IconBox";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

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
    <section className="rounded-theme-md border border-theme-border bg-theme-background shadow-theme-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-theme-md">
      {/* Header */}
      <div className="flex items-center justify-center p-4">
        <div className="flex gap-4">
          {icon && (
            <IconBox
              icon={icon}
              className="bg-theme-success-gradient text-theme-text"
            />
          )}

          <div>
            <h2 className="text-lg font-semibold">{title}</h2>

            {description && (
              <p className="mt-1 text-sm text-text">{description}</p>
            )}
            {actionLink && actionLink}
          </div>
        </div>

        <ChevronRight size={18} className="text-theme-text-muted" />
      </div>

      <div className="border-t border-theme-border">
        {/* Content */}
        <div>{children}</div>
      </div>
    </section>
  );
};
