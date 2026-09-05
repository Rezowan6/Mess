import { formatDate } from "@/shared/utils/date.utils";
import { X } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface SkippedRequest {
  date: string;
  reason: string;
}

interface SkippedDatesCardProps {
  items: SkippedRequest[];
  title?: string;
}

export const SkippedDatesCard = ({
  items,
  title = "Skipped Dates",
}: SkippedDatesCardProps) => {
  const [visible, setVisible] = useState(true);

    if (!visible || !items.length) return null;

  return (
    <div className="mt-4 rounded-lg border border-warning/30 bg-warning/10 p-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-warning">{title}</h4>

        <Badge variant="soft-warning">{items.length}</Badge>

        <Button
          unstyled
          type="button"
          className="bg-transparent"
          onClick={() => setVisible(false)}
          aria-label={`Close ${title}`}
        >
          <X size={16} />
        </Button>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={`${item.date}-${item.reason}`}
            className="rounded-md bg-base-100 p-3"
          >
            <p className="font-medium">{formatDate(item.date)}</p>

            <p className="mt-1 text-sm text-base-content/60">{item.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
