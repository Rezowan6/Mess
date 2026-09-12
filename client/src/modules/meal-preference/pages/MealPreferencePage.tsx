import { AddMealReqModal } from "@/modules/meal-request/components/createReq/AddMealReqModal";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
import { useState } from "react";
import { MealPreferenceForm } from "../components/MealPreferenceForm";
import { MealRequestSection } from "@/modules/meal-request/pages/MealRequestSection";

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

        <MealRequestSection />
      </ManagementPage>

      <AddMealReqModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
