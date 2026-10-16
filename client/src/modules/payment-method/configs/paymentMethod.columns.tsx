import type { TableColumn } from "@/shared/components/ui/Table";
import { PaymentMethodActions } from "../components/PaymentMethodActions";
import type { IPaymentMethod } from "../types/paymentMethod.types";

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
      render: (paymentMethod) => (paymentMethod.isDefault ? "Yes" : "No"),
    },
    {
      key: "isActive",
      title: "Status",
      render: (paymentMethod) =>
        paymentMethod.isActive ? "Active" : "Inactive",
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
