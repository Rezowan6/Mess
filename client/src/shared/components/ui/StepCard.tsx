import type { ReactNode } from "react";
import { Badge } from "./Badge";

interface Props {
  stepNumber?: number;
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const StepCard = ({ stepNumber, icon, title, description }: Props) => {
  return (
    <div className="relative rounded-2xl bg-info/10 p-6 text-center shadow-xl shadow-success/30">
      {stepNumber && (
        <Badge
          variant="success"
          className="absolute -top-4 left-1/2 -translate-x-1/2"
        >
          {stepNumber}
        </Badge>
      )}

      <div className="mx-auto mb-5 mt-4 flex h-14 w-14 items-center justify-center rounded-xl bg-success/10 text-info">
        {icon}
      </div>

      <h3 className="mb-3 text-lg font-semibold">{title}</h3>

      <p className="text-sm leading-6 text-base-content/70">{description}</p>
    </div>
  );
};
