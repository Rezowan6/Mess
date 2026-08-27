interface Meal {
  date: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  guestMeal: string;
}

interface Props {
  meals: Meal[];
}
// not used

export const MyProfileRecentMeals = ({ meals }: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-background shadow-sm">
      <div className="border-b border-info p-5">
        <h3 className="font-semibold">Recent Meals</h3>
        <p className="text-sm opacity-60">Your recent meal activity</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-info/10">
            <tr>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-center">Breakfast</th>
              <th className="px-5 py-3 text-center">Lunch</th>
              <th className="px-5 py-3 text-center">Dinner</th>
              <th className="px-5 py-3 text-center">Guest</th>
            </tr>
          </thead>

          <tbody>
            {meals.map((meal) => (
              <tr
                key={meal.date}
                className="hover:bg-info/10"
              >
                <td className="px-5 py-3">
                  {new Date(meal.date).toLocaleDateString()}
                </td>

                <td className="px-5 py-3 text-center">{meal.breakfast}</td>

                <td className="px-5 py-3 text-center">{meal.lunch}</td>

                <td className="px-5 py-3 text-center">{meal.dinner}</td>

                <td className="px-5 py-3 text-center">{meal.guestMeal}</td>
              </tr>
            ))}

            {meals.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center opacity-60">
                  No meal records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
