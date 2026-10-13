import { ROLES } from "@/shared/constants/roles";
import { ROUTES } from "@/shared/constants/routes";
import { RoleGuard } from "@/shared/guards/role.guard";
import { NoticePage } from "../pages/NoticeListPage";
import { NoticeTable } from "../components/NoticeTable";

export const noticeRoutes = {
  path: ROUTES.NOTICE,

  element: <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.MANAGER]} />,

  children: [
    {
      element: <NoticePage />,

      children: [
        {
          index: true,
          element: <NoticeTable />,
        },
      ],
    },
  ],
};
