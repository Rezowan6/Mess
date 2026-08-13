// src/modules/payment/pages/PaymentCheckoutPage.tsx

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { BackButton } from "@/shared/components/ui/BackButton";

import { PaymentCheckoutHandler } from "../components/PaymentCheckoutHandler";
import { ROUTES } from "@/shared/constants/routes";

interface PaymentCheckoutState {
  redirectUrl?: string;
}

export const PaymentCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as PaymentCheckoutState | null;
  const redirectUrl = state?.redirectUrl;

  useEffect(() => {
    if (!redirectUrl) {
      navigate(ROUTES.PAYMENT, { replace: true });
    }
  }, [redirectUrl, navigate]);

  if (!redirectUrl) {
    return null;
  }

  return (
    <ManagementPage
      title="Payment Checkout"
      description="Redirecting you to the secure payment gateway..."
      footer={<BackButton />}
    >
      <div className="flex min-h-50 items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg" />

          <p className="mt-4 text-sm opacity-70">
            Redirecting to secure payment checkout...
          </p>
        </div>
      </div>

      <PaymentCheckoutHandler redirectUrl={redirectUrl} />
    </ManagementPage>
  );
};
