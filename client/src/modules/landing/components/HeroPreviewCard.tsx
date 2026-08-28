import { InfoCard } from "@/shared/components/ui/InfoCard";

import { heroPreviewConfig } from "../configs/hero-preview.config";
import { Badge } from "@/shared/components/ui/Badge";

export const HeroPreviewCard = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md rounded-2xl bg-accent/10 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-semibold text-accent">Monthly Overview</h3>

          <Badge variant="success" rounded="md">Active</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {heroPreviewConfig.map((item) => (
            <InfoCard
              key={item.id}
              title={item.title}
              value={item.value}
              icon={item.icon}
              iconClassName={item.iconClassName}
              valueClassName={item.valueClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};