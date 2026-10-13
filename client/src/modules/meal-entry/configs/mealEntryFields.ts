import type { InputFieldConfig } from "@/shared/types/form.types";

export const mealEntryFields: InputFieldConfig[] = [
  {
    name: "memberId",
    label: "Member",
    type: "number",
    placeholder: "Enter member ID",
    valueAsNumber: true,
  },
  {
    name: "mealSessionId",
    label: "Meal Session",
    type: "number",
    placeholder: "Enter meal session ID",
    valueAsNumber: true,
  },
  {
    name: "mealRequestId",
    label: "Meal Request",
    type: "number",
    placeholder: "Enter meal request ID",
    valueAsNumber: true,
  },
  {
    name: "date",
    label: "Date",
    type: "date",
    placeholder: "Select date",
  },
  {
    name: "breakfast",
    label: "Breakfast",
    type: "number",
    placeholder: "Enter breakfast quantity",
    valueAsNumber: true,
  },
  {
    name: "lunch",
    label: "Lunch",
    type: "number",
    placeholder: "Enter lunch quantity",
    valueAsNumber: true,
  },
  {
    name: "dinner",
    label: "Dinner",
    type: "number",
    placeholder: "Enter dinner quantity",
    valueAsNumber: true,
  },
];