import { ApiError } from "@/utils/ApiError.js";

import {
  PaymentGateway,
  type PaymentGatewayType,
} from "../payment.interface.js";

import { BkashGateway } from "./bkash/bkash.gateway.js";
import { NagadGateway } from "./nagad/nagad.gateway.js";
import { RocketGateway } from "./rocket/rocket.gateway.js";
import { StripeGateway } from "./stripe/stripe.gateway.js";

import type { PaymentGatewayContract } from "./payment.gateway.interface.js";

export class PaymentGatewayFactory {
  static getGateway(gateway: PaymentGatewayType): PaymentGatewayContract {
    switch (gateway) {
      case PaymentGateway.BKASH:
        return new BkashGateway();

      case PaymentGateway.NAGAD:
        return new NagadGateway();

      case PaymentGateway.ROCKET:
        return new RocketGateway();

      case PaymentGateway.STRIPE:
        return new StripeGateway();

      default:
        throw new ApiError(400, "Unsupported payment gateway.");
    }
  }
}
