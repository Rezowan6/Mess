// src/shared/components/data-display/RecordDeleteMessage.tsx

import type { ReactNode } from "react";

interface RecordDeleteMessageProps {
  description: string;
  details: {
    label: string;
    value: ReactNode;
    highlight?: boolean;
  }[];
}

export const RecordDeleteMessage = ({
  description,
  details,
}: RecordDeleteMessageProps) => {
  return (
    <>
      {description}

      <div className="mt-3 space-y-2 rounded-lg border border-theme-border bg-theme-card p-3">
        {details.map((detail) => (
          <p key={detail.label}>
            <span className="text-theme-muted">{detail.label}: </span>
            <strong
              className={
                detail.highlight ? "text-theme-success" : "text-theme-primary"
              }
            >
              {detail.value}
            </strong>
          </p>
        ))}
      </div>

      <p className="mt-3 text-sm text-theme-muted">
        This action cannot be undone.
      </p>
    </>
  );
};
