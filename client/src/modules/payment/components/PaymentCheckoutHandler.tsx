// src/modules/payment/components/PaymentCheckoutHandler.tsx

import { useEffect } from "react";

interface Props {
  redirectUrl?: string;
}

export const PaymentCheckoutHandler = ({ redirectUrl }: Props) => {
  useEffect(() => {
    if (!redirectUrl) return;

    window.location.replace(redirectUrl);
  }, [redirectUrl]);

  return null;
};
