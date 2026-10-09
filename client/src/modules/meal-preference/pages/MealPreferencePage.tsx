import { AddMealReqModal } from "@/modules/meal-request/components/createReq/AddMealReqModal";
import { AddMealReqModalByDate } from "@/modules/meal-request/components/createReq/AddMealReqModalByDate";
import { MealRequestSection } from "@/modules/meal-request/pages/MealRequestSection";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { PageActionMenu } from "@/shared/components/navigation/PageActionMenu";
import { Calendar1, CalendarRange } from "lucide-react";
import { useState } from "react";
import { MealPreferenceForm } from "../components/MealPreferenceForm";

export function MealPreferencePage() {
  const [isDayRequestOpen, setIsDayRequestOpen] = useState(false);
  const [isRangeRequestOpen, setIsRangeRequestOpen] = useState(false);

  const ITEMS = [
    {
      label: "For a Specific Day",
      icon: Calendar1,
      onClick: () => setIsDayRequestOpen(true),
    },
    {
      label: "For a Date Range",
      icon: CalendarRange,
      onClick: () => setIsRangeRequestOpen(true),
    },
  ];
  return (
    <>
      <ManagementPage
        title="My Meal Preference"
        description="Select your daily meal preference"
        action={<PageActionMenu items={ITEMS} />}
      >
        <MealPreferenceForm />

        <MealRequestSection />
      </ManagementPage>

      <AddMealReqModalByDate
        isOpen={isDayRequestOpen}
        onClose={() => setIsDayRequestOpen(false)}
      />

      <AddMealReqModal
        isOpen={isRangeRequestOpen}
        onClose={() => setIsRangeRequestOpen(false)}
      />
    </>
  );
}
