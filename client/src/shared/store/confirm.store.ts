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

  isLoading: boolean;

  openConfirm: (options: ConfirmOptions) => void;

  setLoading: (value: boolean) => void;

  closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,

  options: null,

  isLoading: false,

  openConfirm: (options) => {
    set({
      isOpen: true,

      options,
    });
  },

  setLoading: (value) => {
    set({
      isLoading: value,
    });
  },

  closeConfirm: () => {
    set({
      isOpen: false,

      options: null,

      isLoading: false,
    });
  },
}));
