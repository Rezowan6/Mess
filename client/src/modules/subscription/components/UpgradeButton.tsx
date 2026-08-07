import { ArrowUpRight } from "lucide-react";

import { ButtonModule } from "@/shared/components/ui/ButtonModule";
import { ROUTES } from "@/shared/constants/routes";
import { Link } from "react-router-dom";

export const UpgradeButton = () => {
  return (
    <Link to={`${ROUTES.SUBSCRIPTION}/upgrade`}>
      <ButtonModule
        text="Upgrade Plan"
        fullWidth
        leftIcon={<ArrowUpRight size={18} />}
      />
    </Link>
  );
};
