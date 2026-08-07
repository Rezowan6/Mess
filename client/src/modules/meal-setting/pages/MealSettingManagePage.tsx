import { useState } from "react";

import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { PermissionGuard } from "@/shared/guards/permission.guard";

import { Settings } from "lucide-react";

import { MealSettingActions } from "../components/MealSettingActions.tsx";
import { MealSettingCard } from "../components/MealSettingCard";
import { MealSettingFormModal } from "../components/MealSettingFormModal";
import { useMealSetting } from "../hooks/useMealSetting";

export const MealSettingManagePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isPending } = useMealSetting();

  const setting = data?.data;

  return (
    <PermissionGuard permission={PERMISSIONS.MEAL_SETTING_VIEW}>
      {isPending ? (
        <p>Loading...</p>
      ) : setting ? (
        <div className="space-y-4">
          <div className="flex justify-end">
            <MealSettingActions
              setting={setting}
              onEdit={() => setIsOpen(true)}
            />
          </div>

          <MealSettingCard setting={setting} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <Settings size={40} className="opacity-50" />

          <p className="text-sm opacity-70">No meal setting configured yet.</p>

          <Button
            variant="success"
            permission={PERMISSIONS.MEAL_SETTING_CREATE}
            onClick={() => setIsOpen(true)}
          >
            Create Meal Setting
          </Button>
        </div>
      )}

      <MealSettingFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setting={setting}
      />
    </PermissionGuard>
  );
};
