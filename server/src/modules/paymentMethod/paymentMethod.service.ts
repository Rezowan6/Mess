import { ApiError } from "@/utils/ApiError.js";
import { encrypt } from "@/utils/encryption.util.js";
import type {
  ICreatePaymentMethodInput,
  IUpdatePaymentMethodInput,
} from "./paymentMethod.interface.js";
import { paymentMethodRepository } from "./paymentMethod.repository.js";

class PaymentMethodService {
  async createPaymentMethod(
    data: ICreatePaymentMethodInput & {
      tenantId: number;
      userId: number;
      accountNumber: string;
    },
  ) {
    const {
      tenantId,
      userId,
      provider,
      accountName,
      accountNumber,
      isDefault = false,
    } = data;

    const normalizedAccountNumber = accountNumber?.replace(/\s+/g, "");

    if (
      !tenantId ||
      !userId ||
      !provider ||
      !accountName?.trim() ||
      !normalizedAccountNumber ||
      !/^\d{11}$/.test(normalizedAccountNumber)
    ) {
      throw new ApiError(400, "Invalid payment method data.");
    }

    const accountLast4 = normalizedAccountNumber.slice(-4);

    const accountNumberEncrypted = encrypt(normalizedAccountNumber);

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
      isActive: result.isActive,
      verifiedAt: result.verifiedAt,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async getPaymentMethods(tenantId: number, userId: number) {
    const paymentMethods = await paymentMethodRepository.findAll({
      where: {
        tenantId,
        userId,
      },
      attributes: {
        exclude: ["accountNumberEncrypted"],
      },
      order: [["createdAt", "DESC"]],
    });

    return paymentMethods.map((paymentMethod) => ({
      id: String(paymentMethod.id),
      tenantId: paymentMethod.tenantId,
      userId: paymentMethod.userId,
      provider: paymentMethod.provider,
      accountName: paymentMethod.accountName,
      maskedAccountNumber: `****${paymentMethod.accountLast4}`,
      accountLast4: paymentMethod.accountLast4,
      isDefault: paymentMethod.isDefault,
      isVerified: paymentMethod.isVerified,
      verifiedAt: paymentMethod.verifiedAt,
      isActive: paymentMethod.isActive,
      createdAt: paymentMethod.createdAt,
      updatedAt: paymentMethod.updatedAt,
    }));
  }

  async updatePaymentMethod(
    id: number,
    tenantId: number,
    userId: number,
    data: IUpdatePaymentMethodInput,
  ) {
    const paymentMethod = await paymentMethodRepository.findOne({
      id,
      tenantId,
      userId,
    });

    if (!paymentMethod) {
      throw new ApiError(404, "Payment method not found.");
    }

    await paymentMethod.update({
      ...(data.accountName !== undefined && {
        accountName: data.accountName.trim(),
      }),
      ...(data.isDefault !== undefined && {
        isDefault: data.isDefault,
      }),
      ...(data.isActive !== undefined && {
        isActive: data.isActive,
      }),
    });

    return {
      id: String(paymentMethod.id),
      tenantId: paymentMethod.tenantId,
      userId: paymentMethod.userId,
      provider: paymentMethod.provider,
      accountName: paymentMethod.accountName,
      maskedAccountNumber: `****${paymentMethod.accountLast4}`,
      accountLast4: paymentMethod.accountLast4,
      isDefault: paymentMethod.isDefault,
      isVerified: paymentMethod.isVerified,
      isActive: paymentMethod.isActive,
      verifiedAt: paymentMethod.verifiedAt,
      createdAt: paymentMethod.createdAt,
      updatedAt: paymentMethod.updatedAt,
    };
  }

  async deletePaymentMethod(id: number, tenantId: number, userId: number) {
    const paymentMethod = await paymentMethodRepository.findOne({
      id,
      tenantId,
      userId,
    });

    if (!paymentMethod) {
      throw new ApiError(404, "Payment method not found.");
    }

    await paymentMethodRepository.delete({id, tenantId, userId});

    return null;
  }
}

export const paymentMethodService = new PaymentMethodService();
