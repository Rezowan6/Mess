import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";

import { PaymentMethodTable } from "../components/PaymentMethodTable";
import { PaymentMethodPage } from "../pages/PaymentMethodPage";

export const paymentMethodRoutes = {
  path: ROUTES.PAYMENT_METHOD,
  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,
  children: [
    {
      element: <PaymentMethodPage />,
      children: [
        {
          index: true,
          element: <PaymentMethodTable />,
        },
      ],
    },
  ],
};
