import { Modal } from "@/shared/components/ui/Modal";
import { MealRequestFormByDate } from "./MealRequestFormByDate";

interface Props {
  isOpen: boolean;

  onClose: () => void;
}

export const AddMealReqModalByDate = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add meal request">
      <MealRequestFormByDate onClose={onClose} />
    </Modal>
  );
};
