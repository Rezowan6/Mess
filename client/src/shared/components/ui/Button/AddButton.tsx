import { Plus } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/shared/components/ui/Button";
import type { Permission } from "@/shared/constants/permissions";

type AddButtonProps = Omit<
  ComponentProps<typeof Button>,
  "variant" | "leftIcon" | "permission" | "children"
> & {
  /** Required, so an add button can never be shown without an access check */
  permission: Permission;
  label: string;
};

export const AddButton = ({
  permission,
  label,
  type = "button",
  ...props
}: AddButtonProps) => {
  return (
    <Button
      variant="success"
      type={type}
      permission={permission}
      leftIcon={<Plus size={16} />}
      {...props}
    >
      {label}
    </Button>
  );
};
