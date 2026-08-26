import { InfoCard } from "@/shared/components/ui/InfoCard";

import { getMyProfileInfoCards } from "../configs/myProfileInfoCards.config";
import type { IMealCalculationSummary } from "../types/myProfile.types";

interface Props {
  summary: IMealCalculationSummary;
}

export const MyProfileInfoCards = ({ summary }: Props) => {
  const infoCards = getMyProfileInfoCards(summary);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {infoCards.map((card) => (
        <InfoCard
          key={card.key}
          icon={card.icon}
          iconClassName={card.iconClassName}
          title={card.title}
          value={card.value}
          valueClassName={card.valueClassName}
        />
      ))}
    </div>
  );
};
