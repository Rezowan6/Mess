import { AlertTriangle } from "lucide-react";

export const ExpiryAlert = () => {
  return (
    <div className="rounded-2xl border border-warning/40 bg-warning/18 p-5">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-warning">
          <AlertTriangle size={22} />
        </div>

        <div>
          <h4 className="font-semibold">Subscription Renewal</h4>

          <p className="mt-1 text-sm text-base-content/70">
            Your subscription will expire soon. Renew your plan to continue
            using all features without interruption.
          </p>
        </div>
      </div>
    </div>
  );
};
