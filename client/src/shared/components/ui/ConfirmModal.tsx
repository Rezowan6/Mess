import { useConfirmStore } from "@/shared/store/confirm.store";
import { Button } from "./Button";

// interface ConfirmModalProps {
//   isOpen: boolean;

//   title?: string;

//   message?: string;

//   confirmText?: string;

//   cancelText?: string;

//   isLoading?: boolean;

//   onConfirm: () => void;

//   onClose: () => void;
// }

export const ConfirmModal = () => {
  const { isOpen, options, closeConfirm } = useConfirmStore();

  if (!isOpen || !options) return null;

  const handleConfirm = () => {
     options.onConfirm();

    closeConfirm();
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-lg font-bold">{options.title ?? "Confirm Action"}</h3>

        <p className="py-4">{options.message ?? "Are you sure?"}</p>

        <div className="modal-action">
          <Button variant="ghost" onClick={closeConfirm}>
            {options.cancelText ?? "Cancel"}
          </Button>

          <Button
            variant="error"
            onClick={handleConfirm}
          >
            {options.confirmText ?? "Confirm"}
          </Button>
        </div>
      </div>

      <div className="modal-backdrop" onClick={closeConfirm} />
    </dialog>
  );
};
