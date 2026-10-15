import { BaseRepository } from "@/common/repo/base.repository.js";
import { PaymentMethod } from "@/models/index.js";

class PaymentMethodRepository extends BaseRepository<PaymentMethod> {
  constructor() {
    super(PaymentMethod);
  }
}

export const paymentMethodRepository = new PaymentMethodRepository();
