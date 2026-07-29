import type { ITenantMember } from "@/modules/user-management/types/userManagement.types";

interface Props {
  member: ITenantMember;
  onAddDeposit: (member: ITenantMember, amount: number) => void;
}

export const QuickDepositButtons = ({ member, onAddDeposit }: Props) => {
  return (
    <div className="flex gap-2">
      {[500, 1000, 1500].map((amount) => (
        <button
          key={amount}
          onClick={() => onAddDeposit(member, amount)}
          className="
            w-16 h-8 
            cursor-pointer 
            bg-cyan-600 
            hover:bg-cyan-400 
            rounded 
            text-white 
            font-bold
          "
        >
          {amount}
        </button>
      ))}
    </div>
  );
};
