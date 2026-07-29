import type { ITenantMember } from "@/modules/user-management/types/userManagement.types";
import { Button } from "@/shared/components/ui/Button";

interface Props {
  member: ITenantMember;
  onAddDeposit: (member: ITenantMember, amount: number) => void;
}

export const QuickDepositButtons = ({ member, onAddDeposit }: Props) => {
  return (
    <div className="flex gap-2">
      {[500, 1000, 1500].map((amount) => (
        <Button
        variant="primary"
          key={amount}
          onClick={() => onAddDeposit(member, amount)}
          className="
            w-16 h-8"
        >
          {amount}
        </Button>
      ))}
    </div>
  );
};
