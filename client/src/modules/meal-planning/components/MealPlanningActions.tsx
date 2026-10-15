import { Button } from "@/shared/components/ui/Button";
import { useRejectMeal } from "../hooks/useRejectMeal";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import type { IMealType } from "../types/mealPlanning.types";
import { formatDate } from "@/shared/utils/date.utils";

interface Props {
    member: {
        userId: number;
        status: string;
        date: string;
        updatedAt: string;
        memberName: string;
        avatar: string | null;
      };
      meal: IMealType;
}

export const MealPlanningActions = ({ member, meal }: Props) => {
  const { mutateAsync: rejectMeal, isPending } = useRejectMeal();
  
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const rejectMsg = <RecordDeleteMessage
    description={`Are you sure you want to turn off this ${meal}?`}
    details={[
        { label: "Member", value: member.memberName, highlight: true },
        { label: "Meal", value: meal },
        { label: "Date", value: formatDate(member.date )},
    ]}
    />

  const handleReject = () =>
    openConfirm({
      title: "Turn Off Meal",
      message: (
        rejectMsg
      ),
      onConfirm: async () => {
        try {
          setLoading(true);
          await rejectMeal({ userId: member.userId, meal });
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="primary"
        onClick={handleReject}
        disabled={isPending}
        loading={isPending}
      >
        Off
      </Button>
    </div>
  );
};