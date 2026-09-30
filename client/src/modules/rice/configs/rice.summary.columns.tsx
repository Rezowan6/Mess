import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { Badge } from "@/shared/components/ui/Badge";
import type {
  IRice,
  RicePaymentStatusValue,
  RicePurchaseTypeValue,
} from "../types/rice.types";

export const useRiceSummaryColumns = (): TableColumn<IRice>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IRice>[] = [
    {
      key: "member",
      title: "Member",
      render: (rice) => (
        <MemberAvatar name={rice.creator?.name} avatar={rice.creator?.avatar} />
      ),
    },
    {
      key: "quantity",
      title: "Total Rice",
      render: (rice) => `${Number(rice.quantity).toFixed(2)} kg`,
    },
    {
      key: "totalAmount",
      title: "Total Amount",
      render: (rice) => `৳${Number(rice.totalAmount).toFixed(2)}`,
    },
    {
      key: "purchaseType",
      title: "Purchase Type",
      render: (rice) => {
        const variantMap: Record<RicePurchaseTypeValue, "success" | "warning"> =
          {
            PAID: "success",
            CREDIT: "warning",
          };

        return (
          <Badge size="sm" variant={variantMap[rice.purchaseType]}>
            {rice.purchaseType}
          </Badge>
        );
      },
    },
    {
      key: "paymentStatus",
      title: "Payment Status",
      render: (rice) => {
        const variantMap: Record<
          RicePaymentStatusValue,
          "success" | "warning" | "error" | "info"
        > = {
          PAID: "success",
          DUE: "error",
          PARTIAL: "warning",
          SETTLED: "info",
        };

        return (
          <Badge size="sm" variant={variantMap[rice.paymentStatus]}>
            {rice.paymentStatus}
          </Badge>
        );
      },
    },
  ];

  if (can(PERMISSIONS.EXPENSE_CREATE)) {
    columns.push({
      key: "details",
      title: "Details",
      render: (rice) => (
        <ActionLink
          state={{ memberId: rice.createdBy }}
          to={`${ROUTES.EXPENSE}/rice/history`}
        >
          Details
        </ActionLink>
      ),
    });
  }

  return columns;
};
