import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;

  title?: string;

  children: ReactNode;

  footer?: ReactNode;

  onClose: () => void;

  size?: "sm" | "md" | "lg";
}

const SIZE_CLASS = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
} as const;

export const Modal = ({
  isOpen,

  title,

  children,

  footer,

  onClose,

  size = "md",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog
      open
      onCancel={onClose}
      className="fixed inset-0 z-50 m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-transparent p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-theme-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal box */}
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-theme-xl border border-theme-border bg-theme-modal p-6 text-theme-text shadow-theme-lg ${SIZE_CLASS[size]}`}
      >
        {title && (
          <h3 className="text-lg font-bold text-theme-text">{title}</h3>
        )}

        <div className="py-4">{children}</div>

        {footer && (
          <div className="mt-2 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
};
