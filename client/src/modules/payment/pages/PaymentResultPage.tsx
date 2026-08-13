// src/modules/payment/pages/PaymentResultPage.tsx

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { Button } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/constants/routes";
import { paymentResultConfig } from "../configs/paymentResult.config";
import type { PaymentStatusType } from "../types/payment.types";

interface PaymentResultState {
  status?: PaymentStatusType;
  paymentId?: number;
}

export const PaymentResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as PaymentResultState | null;

  const status = state?.status ?? "pending";
  const paymentId = state?.paymentId;

  const config = paymentResultConfig[status];
  const Icon = config.icon;

  useEffect(() => {
    /**
     * Do not trust URL/query parameters as payment proof.
     *
     * The backend/gateway verification is the source of truth.
     * This page is only a presentation layer.
     */
  }, []);

  const handleViewPayments = () => {
    navigate(ROUTES.PAYMENT, {
      replace: true,
    });
  };

  const handleRetry = () => {
    navigate(ROUTES.PAYMENT, {
      replace: true,
    });
  };

  return (
    <ManagementPage
      title="Payment Result"
      description="Payment transaction status"
    >
      <div className="flex min-h-100 items-center justify-center">
        <div className="w-full max-w-lg rounded-2xl border border-info bg-success/10 p-8 text-center shadow-sm">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
              config.variant === "success"
                ? "bg-success/10 text-success"
                : config.variant === "error"
                  ? "bg-error/10 text-error"
                  : config.variant === "warning"
                    ? "bg-warning/10 text-warning"
                    : config.variant === "neutral"
                      ? "bg-base-200 text-base-content"
                      : "bg-info/10 text-info"
            }`}
          >
            <Icon className="h-10 w-10" />
          </div>

          <h2 className="mt-6 text-2xl font-bold">{config.title}</h2>

          <p className="mt-3 text-sm opacity-70">{config.description}</p>

          {paymentId && (
            <div className="mt-5 rounded-lg bg-base-200 p-3 text-sm">
              Payment ID: <span className="font-semibold">#{paymentId}</span>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {status === "failed" || status === "cancelled" ? (
              <Button type="button" variant="primary" onClick={handleRetry}>
                Try Again
              </Button>
            ) : null}

            <Button
            variant="success"
              onClick={handleViewPayments}
            >
              View Payments
            </Button>
          </div>
        </div>
      </div>
    </ManagementPage>
  );
};
