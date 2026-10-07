import { Minus, Plus } from "lucide-react";

interface Props {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion = ({ title, children, defaultOpen = false }: Props) => {
  return (
    <details
      open={defaultOpen}
      className="group rounded-theme-lg border border-theme-border bg-theme-info-soft"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-lg font-semibold text-theme-text [&::-webkit-details-marker]:hidden">
        {title}

        <Plus
          size={18}
          className="shrink-0 text-theme-text-muted group-open:hidden"
        />
        <Minus
          size={18}
          className="hidden shrink-0 text-theme-text-muted group-open:block"
        />
      </summary>

      <div className="px-4 pb-4 text-sm text-theme-text-secondary">
        {children}
      </div>
    </details>
  );
};
