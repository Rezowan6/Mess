import { Pencil } from "lucide-react";

import type { IMealSetting } from "../types/mealSetting.types";

import { Button } from "@/shared/components/ui/Button";

import { useRBAC } from "@/shared/hooks/useRBAC";

import { ToggleSwitch } from "@/shared/components/ui/ToggleSwitch";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useState } from "react";
import { useUpdateMealSetting } from "../hooks/useUpdateMealSetting";

interface Props {
  setting: IMealSetting;

  onEdit: () => void;
}

export const MealSettingActions = ({ setting, onEdit }: Props) => {
  const { can } = useRBAC();

  const updateMutation = useUpdateMealSetting();

  const [autoApprove, setAutoApprove] = useState(
    setting.autoApproveMealRequest,
  );

  const handleAutoApproveChange = (value: boolean) => {
    setAutoApprove(value);

    updateMutation.mutate({
      autoApproveMealRequest: value,
    });
  };

  return (
    <div className="flex items-center gap-4">
      {can(PERMISSIONS.MEAL_SETTING_UPDATE) && (
        <ToggleSwitch
          checked={autoApprove}
          onChange={handleAutoApproveChange}
          disabled={updateMutation.isPending}
          label="Auto Approve"
        />
      )}
      {can(PERMISSIONS.MEAL_SETTING_UPDATE) && (
        <Button
          unstyled
          leftIcon={<Pencil />}
          className="px-2 sm:px-3 h-8"
          onClick={onEdit}
        >
          <span className="hidden sm:inline">Edit</span>
        </Button>
      )}
    </div>
  );
};
