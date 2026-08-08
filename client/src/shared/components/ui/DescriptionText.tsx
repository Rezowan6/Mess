import { useState } from "react";

interface DescriptionTextProps {
  text?: string | null;
  maxWords?: number;
  className?: string;
}

export const DescriptionText = ({
  text,
  maxWords = 6,
  className,
}: DescriptionTextProps) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const words = text.split(/\s+/);
  const shouldTruncate = words.length > maxWords;

  const visibleText = expanded ? text : words.slice(0, maxWords).join(" ");

  return (
    <p className={className}>
      {visibleText}

      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="ml-1 font-medium text-info hover:underline cursor-pointer"
        >
          {expanded ? "Less" : "... More"}
        </button>
      )}
    </p>
  );
};
