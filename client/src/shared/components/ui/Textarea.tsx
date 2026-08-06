import clsx from "clsx";
import type { TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const Textarea = ({ className, ...props }: Props) => {
  return (
    <textarea
      {...props}
      className={clsx(
        "textarea h-32 w-full border border-transparent bg-accent/5 focus:border-success focus:outline-none",
        className,
      )}
    />
  );
};
