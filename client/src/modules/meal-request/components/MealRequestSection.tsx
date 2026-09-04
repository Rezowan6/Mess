import { MealRequestForm } from "./MealRequestForm";
import { MealRequestHeader } from "./MealRequestHeader";

export const MealRequestSection = () => {
  return (
    <section className="mt-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <MealRequestHeader />

      <div className="mt-5">
        <MealRequestForm />
      </div>
    </section>
  );
};
