import { SettingsCard } from "@/modules/settings/components/SettingsCard";
import { Button } from "@/shared/components/ui/Button";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { LogOut } from "lucide-react";
import { useLogout } from "../hooks/useLoagout";

const LogoutSection = () => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const logoutMutation = useLogout();

  const handleLogout = () => {
    openConfirm({
      title: "Logout",
      message: <>Are you sure you want to logout?</>,
      onConfirm: async () => {
        try {
          setLoading(true);
          await logoutMutation.mutateAsync();
        } finally {
          setLoading(false);
        }
      },
    });
  };
  return (
    <SettingsCard
      title="Logout"
      description="Sign out of your account on this device."
      icon={<LogOut size={22} />}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-2">
        {/* Left */}
        <div>
          <h3 className="font-medium text-error">Sign out</h3>

          <p className="mt-1 text-sm text-text">
            You will need to log in again to access your account.
          </p>
        </div>

        {/* Right */}
        <Button
          type="button"
          variant="error"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          leftIcon={<LogOut />}
        >
          Logout
        </Button>
      </div>
    </SettingsCard>
  );
};

export default LogoutSection;
