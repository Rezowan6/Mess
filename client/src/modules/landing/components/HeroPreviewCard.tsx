export const HeroPreviewCard = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-semibold">Monthly Overview</h3>

          <span className="badge bg-gradient-success p-2">Active</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-primary/10 p-4">
            <p className="text-sm text-base-content/60">Total Meals</p>
            <h4 className="text-2xl font-bold">245</h4>
          </div>

          <div className="rounded-xl bg-success/10 p-4">
            <p className="text-sm text-base-content/60">Deposit</p>
            <h4 className="text-2xl font-bold">৳25,000</h4>
          </div>

          <div className="rounded-xl bg-warning/10 p-4">
            <p className="text-sm text-base-content/60">Members</p>
            <h4 className="text-2xl font-bold">18</h4>
          </div>

          <div className="rounded-xl bg-info/10 p-4">
            <p className="text-sm text-base-content/60">Balance</p>
            <h4 className="text-2xl font-bold">৳5,400</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
