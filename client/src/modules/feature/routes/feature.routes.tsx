import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { FeatureTable } from "../components/FeatureTable";
import { FeaturePage } from "../pages/FeaturePage";
export const featureRoutes = {
  path: ROUTES.FEATURE,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN]} />,

  children: [
    {
      element: <FeaturePage />,

      children: [
        {
          index: true,
          element: <FeatureTable />,
        },
      ],
    },
  ],
};
