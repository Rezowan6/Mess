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
    <section className="rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-center p-6">
        <div className="flex gap-4">
          {icon && (
            <IconBox
              icon={icon}
              className="bg-gradient-success text-white"
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

        <ChevronRight size={18} className="text-text-muted" />
      </div>

      <div className="border-t border-border">
        {/* Content */}
        <div>{children}</div>
      </div>
    </section>
  );
};
