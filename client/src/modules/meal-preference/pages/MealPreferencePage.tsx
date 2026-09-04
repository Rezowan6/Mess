import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { MealPreferenceForm } from "../components/MealPreferenceForm";
import { MealRequestPage } from "@/modules/meal-request/pages/MealRequestPage";

export function MealPreferencePage() {
  return (
    <>
      <ManagementPage
        title="My Meal Preference"
        description="Select your daily meal preference"
      >
        <MealPreferenceForm />

        <MealRequestPage />
      </ManagementPage>
    </>
  );
}
