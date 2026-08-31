import { ArrowUpRight } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { Link } from "react-router-dom";

export const UpgradeButton = () => {
  return (
    <Link to={`${ROUTES.SUBSCRIPTION}/upgrade`}>
      <Button
        fullWidth
        leftIcon={<ArrowUpRight size={18} />}
        permission={PERMISSIONS.SUBSCRIPTION_CREATE}
      >
        Upgrade Plan
      </Button>
    </Link>
  );
};
