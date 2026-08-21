import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";

import { PaymentLayout } from "../layouts/PaymentLayout";
import { PaymentCheckoutPage } from "../pages/PaymentCheckoutPage";
import { PaymentDetailsPage } from "../pages/PaymentDetailsPage";
import { PaymentHistoryPage } from "../pages/PaymentHistoryPage";
import { PaymentPage } from "../pages/PaymentPage";
import { PaymentResultPage } from "../pages/PaymentResultPage";

export const paymentRoutes = {
  path: ROUTES.PAYMENT,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <PaymentLayout />,

      children: [
        {
          index: true,
          element: <PaymentPage />,
        },
        {
          path: ":id",
          element: <PaymentDetailsPage />,
        },
        {
          path: "history",
          element: <PaymentHistoryPage />,
        },
        {
          path: "checkout",
          element: <PaymentCheckoutPage />,
        },
        {
          path: "result",
          element: <PaymentResultPage />,
        },
      ],
    },
  ],
};
