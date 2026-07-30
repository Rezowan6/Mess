import { InfoCard } from "@/shared/components/ui/InfoCard";
import { getDepositInfoCards } from "../configs/depositInfoCards";

interface Props {
  memberName: string;
  totalDeposit: number;
}

export const DepositInfoCard = ({ memberName, totalDeposit }: Props) => {
  const infoCards = getDepositInfoCards(memberName, totalDeposit);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
