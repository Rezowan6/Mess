import { useConfirmStore } from "@/shared/store/confirm.store";
import { Button } from "./Button";
import { Modal } from "./Modal";

export const ConfirmModal = () => {
  const { isOpen, options, isLoading, closeConfirm } = useConfirmStore();

  if (!isOpen || !options) return null;

  const handleConfirm = async () => {
    try {
      await options.onConfirm();
    } finally {
      closeConfirm();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeConfirm}
      title={options.title ?? "Confirm Action"}
      footer={
        <>
          <Button variant="success" onClick={closeConfirm}>
            {options.cancelText ?? "Cancel"}
          </Button>

          <Button variant="error" onClick={handleConfirm} loading={isLoading}>
            {options.confirmText ?? "Confirm"}
          </Button>
        </>
      }
    >
      {options.message ?? "Are you sure?"}
    </Modal>
  );
};
