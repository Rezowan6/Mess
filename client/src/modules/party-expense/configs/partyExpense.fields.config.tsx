import { DollarSign } from "lucide-react";
import type { PartyExpenseFormValues } from "../schemas/partyExpense.schema";

interface PartyExpenseFieldConfig {
  name: keyof PartyExpenseFormValues;
  label: string;
  type: string;
  placeholder: string;
  valueAsNumber?: boolean;
  leftIcon?: React.ReactNode;
}

export const partyExpenseFields = [
  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter party expense amount",
    valueAsNumber: true,
    leftIcon: <DollarSign size={18} />,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter description",
  },
] satisfies PartyExpenseFieldConfig[];
