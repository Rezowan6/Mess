import { useCreatePayment } from "@/modules/payment/hooks/useCreatePayment";
import { PaymentGateway } from "@/modules/payment/types/payment.types";
import type { IPlan } from "@/modules/plan/types/plan.types";
import { PricingCardAction } from "@/shared/components/ui/PricingCardAction";
import { PricingCardFeatures } from "@/shared/components/ui/PricingCardFeatures";
import { PricingCardHeader } from "@/shared/components/ui/PricingCardHeader";
import { ROUTES } from "@/shared/constants/routes";
import type { ApiResponse } from "@/shared/types/api.types";
import { useNavigate } from "react-router-dom";
import { useCreateSubscription } from "../hooks/useCreateSubscription";
import type { ISubscription } from "../types/subscription.types";

interface Props {
  plan: IPlan;
}

export const PlanCard = ({ plan }: Props) => {
  const createSubscription = useCreateSubscription();
  const createPayment = useCreatePayment();
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    createSubscription.mutate(
      {
        planId: plan.id,
      },
      {
        onSuccess: (response: ApiResponse<ISubscription>) => {
          const subscription = response?.data;

          createPayment.mutate(
            {
              subscriptionId: subscription.id,
              gateway: PaymentGateway.BKASH,
            },
            {
              onSuccess: (paymentResponse) => {
                const redirectUrl = paymentResponse.data?.redirectUrl;

                if (!redirectUrl) {
                  throw new Error("Payment checkout URL was not returned.");
                }

                navigate(`${ROUTES.PAYMENT}/checkout`, {
                  replace: true,
                  state: {
                    redirectUrl,
                  },
                });
              },
            },
          );
        },
      },
    );
  };

  return (
    <div
      className={`relative rounded-2xl border bg-background p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        plan.name === "Standard" ? "border-info shadow-lg" : "border-accent"
      }`}
    >
      <div className="space-y-3">
        <PricingCardHeader plan={plan} />

        <PricingCardAction
          label="Choose Plan"
          isPopular={plan.name === "Standard"}

          onClick={handleChoosePlan}
          loading={createSubscription.isPending || createPayment.isPending}
          disabled={createSubscription.isPending || createPayment.isPending}
        />

        <PricingCardFeatures features={plan.features ?? []} />
      </div>
    </div>
  );
};
