import type { ComponentType } from "react";

import type { Permission } from "@/shared/constants/permissions";

export interface RecoveryEntry {
  // Unique and stable, used as the React key
  key: string;
  // Who can see this item on the Data Recovery card
  permission: Permission;
  // The module's own item, built with the shared RecoveryItem
  Component: ComponentType;
}
