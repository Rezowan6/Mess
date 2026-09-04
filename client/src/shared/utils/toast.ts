import toast from "react-hot-toast";
import { getErrorMessage } from "./getErrorMessage";

export const showSuccessToast = (
  message = "Operation completed successfully",
) => {
  toast.success(message);
};

export const showApiErrorToast = (error: unknown) => {
  toast.error(getErrorMessage(error));
};

export const showInfoToast = (message: string) => {
  toast(message);
};

export const showWarningToast = (message: string) => {
  toast(message, {
    icon: "⚠️",
  });
};
