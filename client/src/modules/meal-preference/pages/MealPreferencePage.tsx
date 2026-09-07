import { MealRequestPage } from "@/modules/meal-request/pages/MealRequestPage";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
import { useState } from "react";
import { MealPreferenceForm } from "../components/MealPreferenceForm";
import { AddMealReqModal } from "@/modules/meal-request/components/createReq/AddMealReqModal";

export function MealPreferencePage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ManagementPage
        title="My Meal Preference"
        description="Select your daily meal preference"
        action={
          <Button variant="success" onClick={() => setIsOpen(true)}>
            Create Requests
          </Button>
        }
      >
        <MealPreferenceForm />

        <MealRequestPage />
      </ManagementPage>

      <AddMealReqModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
