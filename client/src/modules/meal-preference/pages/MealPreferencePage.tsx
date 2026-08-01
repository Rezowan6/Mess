import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { MealPreferenceForm } from "../components/MealPreferenceForm";

export function MealPreferencePage() {
  return (
    <>
      <ManagementPage
        title="My Meal Preference"
        description="Select your daily meal preference"
      >
        <MealPreferenceForm />
      </ManagementPage>
    </>
  );
}
