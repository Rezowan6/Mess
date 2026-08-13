import type { Permission } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import styel from "@/styles/modules/button.module.css";
import type { ReactNode } from "react";

interface props {
  text: string;
  leftIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  permission?: Permission;
}

export const ButtonModule = ({
  text,
  leftIcon,
  className,
  fullWidth,
  permission,
  ...props
}: props) => {
  const { can } = useRBAC();
  if (permission && !can(permission)) {
    return null;
  }
  return (
    <>
      <button
        className={`${styel.btn} ${className} ${fullWidth && "w-full"} relative transition-all duration-1000 ease-in-out flex items-center justify-center gap-2`}
        {...props}
      >
        {text && <span>{text}</span>}
        {leftIcon && (
          <span className="absolute px-2 top-1/2 -translate-y-1/2">
            {leftIcon}
          </span>
        )}
      </button>
    </>
  );
};
