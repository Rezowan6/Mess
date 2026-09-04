import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";

import { MealRequestSection } from "../components/MealRequestSection";

export function MealRequestPage() {
  return (
    <ManagementPage
      title="Meal Request"
      description="Create meal requests for one or multiple days"
    >
      <MealRequestSection />
    </ManagementPage>
  );
}
