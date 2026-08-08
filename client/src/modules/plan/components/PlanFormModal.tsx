import { Modal } from "@/shared/components/ui/Modal";
import { PlanForm } from "./PlanForm";

import type { IPlan } from "../types/plan.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plan?: IPlan | null;
}

export const PlanFormModal = ({ isOpen, onClose, plan = null }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={plan ? "Update Plan" : "Create Plan"}
    >
      <PlanForm plan={plan} onSuccess={onClose} />
    </Modal>
  );
};
