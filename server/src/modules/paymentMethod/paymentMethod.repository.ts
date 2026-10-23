import { BaseRepository } from "@/common/repo/base.repository.js";
import { PaymentMethod } from "@/models/index.js";

class PaymentMethodRepository extends BaseRepository<PaymentMethod> {
  constructor() {
    super(PaymentMethod);
  }

  async findAllByTenantAndUser(tenantId: number, userId: number) {
    return this.model.findAll({
      where: { tenantId, userId },
      attributes: { exclude: ["accountNumberEncrypted"] },
      order: [["createdAt", "DESC"]],
    });
  }
}

export const paymentMethodRepository = new PaymentMethodRepository();
