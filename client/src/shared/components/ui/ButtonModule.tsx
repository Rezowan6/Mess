import styel from "@/styles/modules/button.module.css";
import type { ReactNode } from "react";

interface props {
  text: string;
  leftIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export const ButtonModule = ({ text, leftIcon,className, fullWidth, ...props }: props) => {
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
