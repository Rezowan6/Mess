import { DataTableSection } from "@/shared/components/ui/DataTableSection";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import { useState } from "react";
import { usePaymentMethodColumns } from "../configs/paymentMethod.columns";
import { PAYMENT_METHOD_MESSAGES } from "../configs/paymentMethod.messages";
import { usePaymentMethods } from "../hooks/usePaymentMethods";
import type { IPaymentMethod } from "../types/paymentMethod.types";
import { AddPaymentMethodModal } from "./AddPaymentMethodModal";
import { PaymentMethodTableSkeleton } from "./skeleton/PaymentMethodTableSkeleton";

export const PaymentMethodTable = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<IPaymentMethod | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = usePaymentMethods();

  const paymentMethods = (data?.data ?? []).filter((item) => {
    const searchTerm = search.toLowerCase();

    return (
      item.provider.toLowerCase().includes(searchTerm) ||
      item.accountName.toLowerCase().includes(searchTerm) ||
      item.maskedAccountNumber.includes(searchTerm)
    );
  });

  const PAGE_LIMIT = 10;
  const paginatedData = paymentMethods.slice(
    (page - 1) * PAGE_LIMIT,
    page * PAGE_LIMIT,
  );

  const handleEdit = (paymentMethod: IPaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setIsEditOpen(true);
  };

  const columns = usePaymentMethodColumns(handleEdit);

  return (
    <>
      <DataTableSection
        columns={columns}
        data={paginatedData}
        isPending={isPending}
        isError={isError}
        skeleton={<PaymentMethodTableSkeleton />}
        refetch={refetch}
        search={search}
        onSearch={handleSearch}
        onPageChange={handlePage}
        message={PAYMENT_METHOD_MESSAGES}
      />
      {selectedPaymentMethod && (
        <AddPaymentMethodModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedPaymentMethod(null);
          }}
          paymentMethod={selectedPaymentMethod}
        />
      )}
    </>
  );
};
