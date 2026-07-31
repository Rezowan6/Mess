import { Edit } from "lucide-react";

import type { IMealSetting } from "../types/mealSetting.types";

import { Button } from "@/shared/components/ui/Button";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { PERMISSIONS } from "@/shared/constants/permissions";

interface Props {
  setting: IMealSetting;

  onEdit: () => void;
}

export const MealSettingActions = ({ onEdit }: Props) => {
  const { can } = useRBAC();

  return (
    <div className="flex items-center gap-2">
      {can(PERMISSIONS.MEAL_SETTING_UPDATE) && (
        <Button
          variant="success"
          size="sm"
          leftIcon={<Edit size={14} />}
          className="px-2 sm:px-3 h-8"
          onClick={onEdit}
        >
          <span className="hidden sm:inline">Edit</span>
        </Button>
      )}
    </div>
  );
};
