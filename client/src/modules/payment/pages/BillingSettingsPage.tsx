export const BillingSettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Billing Settings</h2>

        <p className="text-sm text-base-content/70">
          Manage your billing preferences and subscription settings.
        </p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold">Auto Renewal</h4>

              <p className="text-sm text-base-content/70">
                Automatically renew your subscription before expiry.
              </p>
            </div>

            <input
              type="checkbox"
              className="toggle toggle-primary"
              defaultChecked
            />
          </div>

          <div className="divider" />

          <div>
            <h4 className="font-semibold">Payment Method</h4>

            <p className="mt-1 text-sm text-base-content/70">
              Current payment method: bKash
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Billing Email</h4>

            <p className="mt-1 text-sm text-base-content/70">
              billing@messmanagement.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
