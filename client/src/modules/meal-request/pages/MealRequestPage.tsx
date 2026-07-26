import MealRequestForm from "../components/MealRequestForm";

export function MealRequestPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}

      <div>
        <h1 className="text-2xl font-bold">Meal Request</h1>

        <p className="text-sm text-gray-500 mt-1">
          Request your meals for upcoming days.
        </p>
      </div>

      {/* Request Form */}

      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <MealRequestForm />
        </div>
      </div>
    </div>
  );
}
