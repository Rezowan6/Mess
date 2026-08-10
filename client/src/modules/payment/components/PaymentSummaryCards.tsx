import { InfoCard } from "@/shared/components/ui/InfoCard";

import { paymentSummaryCards } from "../configs/paymentSummary.config";
import { usePaymentSummary } from "../hooks/usePaymentSummary";
import type { IPayment } from "../types/payment.types";

interface Props {
  payments: IPayment[];
}

export const PaymentSummaryCards = ({ payments }: Props) => {
  const values = usePaymentSummary(payments);

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {paymentSummaryCards.map((card) => (
        <InfoCard
          key={card.key}
          title={card.title}
          value={values[card.key]}
          icon={card.icon}
        />
      ))}
    </div>
  );
};
