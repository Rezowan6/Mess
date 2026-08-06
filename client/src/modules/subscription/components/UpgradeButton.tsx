import { ArrowUpRight } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

export const UpgradeButton = () => {
  return (
    <Link to={`${ROUTES.SUBSCRIPTION}/upgrade`}>
      <Button
        variant="success"
        rightIcon={<ArrowUpRight size={18} />}
        className="flex w-full"
      >
        Upgrade Plan
      </Button>
    </Link>
  );
};
