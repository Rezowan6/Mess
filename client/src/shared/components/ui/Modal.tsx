import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;

  title?: string;

  children: ReactNode;

  footer?: ReactNode;

  onClose: () => void;

  size?: "sm" | "md" | "lg";
}

export const Modal = ({
  isOpen,

  title,

  children,

  footer,

  onClose,

  size = "md",
}: ModalProps) => {
  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <dialog className="modal modal-open" onCancel={onClose}>
      <div className={`modal-box bg-background ${sizeClass[size]}`}>
        {title && <h3 className="text-lg font-bold">{title}</h3>}

        <div className="py-4">{children}</div>

        {footer && <div className="modal-action">{footer}</div>}
      </div>

      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
