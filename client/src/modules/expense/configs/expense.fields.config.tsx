import { useAllMembers } from "@/modules/user-management/hooks/useAllMembers";
import { DollarSign } from "lucide-react";
import { useMemo, type ReactNode } from "react";

type ExpenseFieldName = "amount" | "signature" | "category" | "description";

export interface ExpenseField {
  name: ExpenseFieldName;
  label: string;
  type: string;
  placeholder: string;
  placeholderTexts?: string[];
  leftIcon?: ReactNode;
  valueAsNumber?: boolean;
}

// Shown while members are loading, or when the mess has no members yet
const FALLBACK_SIGNATURE_TEXTS = [
  "Monthly rent",
  "Grocery purchase",
  "Utility bill",
];

const BASE_FIELDS: ExpenseField[] = [
  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter expense amount",
    placeholderTexts: ["2000", "3000", "4000"],
    leftIcon: <DollarSign size={18} />,
    valueAsNumber: true,
  },
  {
    name: "signature",
    label: "Signature",
    type: "text",
    placeholder: "Enter expense signature",
    placeholderTexts: FALLBACK_SIGNATURE_TEXTS,
  },
  {
    name: "category",
    label: "Category (Optional)",
    type: "text",
    placeholder: "Enter expense category",
    placeholderTexts: ["Food", "Rent", "Utility"],
  },
  {
    name: "description",
    label: "Description (Optional)",
    type: "text",
    placeholder: "Enter expense description",
    placeholderTexts: ["Expense details", "Additional notes"],
  },
];

export const useExpenseFields = (): ExpenseField[] => {
  const { data } = useAllMembers();

  const memberNames = useMemo(() => {
    const names = (data?.data ?? [])
      .map((member) => member.user?.name?.trim())
      .filter((name): name is string => Boolean(name));

    // Same name twice would show the same suggestion twice
    return [...new Set(names)];
  }, [data]);

  return useMemo(
    () =>
      BASE_FIELDS.map((field) =>
        field.name === "signature" && memberNames.length > 0
          ? { ...field, placeholderTexts: memberNames }
          : field,
      ),
    [memberNames],
  );
};
