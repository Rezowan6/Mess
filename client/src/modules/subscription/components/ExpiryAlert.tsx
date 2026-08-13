import { DescriptionText } from "@/shared/components/ui/DescriptionText";
import { AlertTriangle } from "lucide-react";

const description = `Your subscription will expire soon. Renew your plan to continue using all features without interruption.`;

export const ExpiryAlert = () => {
  return (
    <div className="rounded-2xl border border-warning/40 bg-warning/18 p-5">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-warning">
          <AlertTriangle size={22} />
        </div>

        <div>
          <h4 className="font-semibold">Subscription Renewal</h4>

          <DescriptionText
            text={description}
            maxWords={10}
            className="text-sm opacity-70"
          />
        </div>
      </div>
    </div>
  );
};
