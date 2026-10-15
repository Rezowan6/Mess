import { ApiError } from "@/utils/ApiError.js";
import type { ICreatePaymentMethodInput } from "./paymentMethod.interface.js";
import { paymentMethodRepository } from "./paymentMethod.repository.js";

class PaymentMethodService {
  async createPaymentMethod(
    data: ICreatePaymentMethodInput & {
      tenantId: number;
      userId: number;
    },
  ) {
    const {
      tenantId,
      userId,
      provider,
      accountName,
      accountNumberEncrypted,
      accountLast4,
      isDefault = false,
    } = data;

    if (
      !tenantId ||
      !userId ||
      !provider ||
      !accountName?.trim() ||
      !accountNumberEncrypted ||
      !/^\d{4}$/.test(accountLast4)
    ) {
      throw new ApiError(400, "Invalid payment method data.");
    }

    const result = await paymentMethodRepository.create({
      tenantId,
      userId,
      provider,
      accountName: accountName.trim(),
      accountNumberEncrypted,
      accountLast4,
      isDefault,
    });

    return {
      id: String(result.id),
      tenantId: result.tenantId,
      userId: result.userId,
      provider: result.provider,
      accountName: result.accountName,
      maskedAccountNumber: `****${result.accountLast4}`,
      accountLast4: result.accountLast4,
      isDefault: result.isDefault,
      isVerified: result.isVerified,
      verifiedAt: result.verifiedAt,
      isActive: result.isActive,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}

export const paymentMethodService = new PaymentMethodService();
