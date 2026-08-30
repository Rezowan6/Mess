import { ROLES } from "./roles";

import type { SelectOption } from "@/shared/components/ui/Select";

export const ROLE_OPTIONS: SelectOption[] = [
  {
    label: "Admin",
    value: ROLES.ADMIN,
  },
  {
    label: "Manager",
    value: ROLES.MANAGER,
  },
  {
    label: "Member",
    value: ROLES.MEMBER,
  },
  {
    label: "MessMalik",
    value: ROLES.MESS_MALIK,
  },
];
