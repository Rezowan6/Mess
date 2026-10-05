import { Loader2 } from "lucide-react";
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

interface ButtonContentProps {
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading: boolean;
  loadingText: string;
  iconSize: number;
}

// Passes the shared icon size to the icon element
const renderIcon = (icon: ReactNode, size: number) =>
  isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ size?: number }>, { size })
    : null;

export const ButtonContent = ({
  children,
  leftIcon,
  rightIcon,
  loading,
  loadingText,
  iconSize,
}: ButtonContentProps) => {
  if (loading) {
    return (
      <>
        <Loader2 size={iconSize} className="animate-spin" />

        <span>{loadingText}</span>
      </>
    );
  }

  return (
    <>
      {renderIcon(leftIcon, iconSize)}

      {children && <span>{children}</span>}

      {renderIcon(rightIcon, iconSize)}
    </>
  );
};
