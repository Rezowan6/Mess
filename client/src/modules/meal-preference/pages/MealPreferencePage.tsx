import { MealPreferenceForm } from "../components/MealPreferenceForm";

export function MealPreferencePage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">My Meal Preference</h1>

        <p className="text-sm opacity-70">Select your daily meal preference</p>
      </div>

      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <MealPreferenceForm />
        </div>
      </div>
    </div>
  );
}
