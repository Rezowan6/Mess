import type { ITenantMember } from "@/modules/user-management/types/userManagement.types";
import { Button } from "@/shared/components/ui/Button";
import { HorizontalScroller } from "@/shared/components/ui/HorizontalScroller";

interface Props {
  member: ITenantMember;
  onAddDeposit: (member: ITenantMember, amount: number) => void;
}

const QUICK_AMOUNTS = [
  500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 2000,
];

export const QuickDepositButtons = ({ member, onAddDeposit }: Props) => {
  return (
    // Fixed width keeps the table cell from growing; the buttons scroll inside it
    <HorizontalScroller className="w-56 sm:w-72 lg:w-96">
      {QUICK_AMOUNTS.map((amount) => (
        <Button
          key={amount}
          variant="primary"
          onClick={() => onAddDeposit(member, amount)}
          className="h-8 w-16 shrink-0"
        >
          {amount}
        </Button>
      ))}
    </HorizontalScroller>
  );
};
