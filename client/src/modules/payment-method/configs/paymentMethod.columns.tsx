import { Badge } from "@/shared/components/ui/Badge";
import type { TableColumn } from "@/shared/components/ui/Table";
import { PaymentMethodActions } from "../components/PaymentMethodActions";
import type { IPaymentMethod } from "../types/paymentMethod.types";

const DEFAULT_STATUS = {
  Yes: "soft-success",
  No: "soft-error",
} as const;

export const usePaymentMethodColumns = (
  onEdit: (paymentMethod: IPaymentMethod) => void,
): TableColumn<IPaymentMethod>[] => {
  const columns: TableColumn<IPaymentMethod>[] = [
    {
      key: "provider",
      title: "Provider",
      render: (paymentMethod) => paymentMethod.provider,
    },
    {
      key: "accountName",
      title: "Account Name",
      render: (paymentMethod) => paymentMethod.accountName,
    },
    {
      key: "maskedAccountNumber",
      title: "Account Number",
      render: (paymentMethod) => paymentMethod.maskedAccountNumber,
    },
    {
      key: "isDefault",
      title: "Default",
      render: (paymentMethod) => (
        <span>
          <Badge
            size="sm"
            variant={DEFAULT_STATUS[paymentMethod.isDefault ? "Yes" : "No"]}
          >
            {paymentMethod.isDefault ? "Yes" : "No"}
          </Badge>{" "}
        </span>
      ),
    },
    {
      key: "isActive",
      title: "Status",
      render: (paymentMethod) => (
        <span>
          <Badge variant="soft-success" size="sm">
            {paymentMethod.isActive ? "Active" : "Inactive"}
          </Badge>
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (paymentMethod) => (
        <PaymentMethodActions paymentMethod={paymentMethod} onEdit={onEdit} />
      ),
    },
  ];

  return columns;
};
