import { Modal } from "@/shared/components/ui/Modal";
import { MealRequestForm } from "./MealRequestForm";

interface Props {
  isOpen: boolean;

  onClose: () => void;
}

export const AddMealReqModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add meal requests">
      <MealRequestForm onClose={onClose} />
    </Modal>
  );
};
