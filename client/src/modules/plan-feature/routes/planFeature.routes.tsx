import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { PlanFeatureTable } from "../components/PlanFeatureTable";
import { PlanFeaturePage } from "../pages/PlanFeaturePage";
export const planFeatureRoutes = {
  path: ROUTES.PLAN_FEATURE,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <PlanFeaturePage />,

      children: [
        {
          index: true,
          element: <PlanFeatureTable />,
        },
      ],
    },
  ],
};
