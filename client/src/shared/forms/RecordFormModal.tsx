
import type { FormEventHandler, ReactNode } from "react";

import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import type { Permission } from "../constants/permissions";

interface RecordFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isEdit: boolean;
  isPending: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  permission: Permission;
  children: ReactNode;
}

export const RecordFormModal = ({
  isOpen,
  onClose,
  title,
  isEdit,
  isPending,
  onSubmit,
  permission,
  children,
}: RecordFormModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        {children}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="error" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="success"
            type="submit"
            loading={isPending}
            loadingText={isEdit ? "Updating..." : "Saving..."}
            permission={permission}
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
