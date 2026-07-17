import type { ReactNode } from "react";
import { create } from "zustand";

interface ConfirmOptions {
  title?: string;

  message?: ReactNode;

  confirmText?: string;

  cancelText?: string;

  onConfirm: () => void;
}

interface ConfirmState {
  isOpen: boolean;

  options: ConfirmOptions | null;

  openConfirm: (options: ConfirmOptions) => void;

  closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,

  options: null,

  openConfirm: (options) => {
    set({
      isOpen: true,

      options,
    });
  },

  closeConfirm: () => {
    set({
      isOpen: false,

      options: null,
    });
  },
}));
