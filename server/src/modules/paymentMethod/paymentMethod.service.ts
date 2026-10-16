import sequelize from "@/configs/db.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { encrypt } from "@/utils/encryption.util.js";
import { Op, UniqueConstraintError } from "sequelize";
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
  ): Promise<null> {
    const accountName = data.accountName?.trim();

    if (
      accountName !== undefined &&
      (accountName.length < 2 || accountName.length > 150)
    ) {
      throw new ApiError(
        400,
        "Account name must be between 2 and 150 characters.",
      );
    }

    if (
      accountName === undefined &&
      data.isDefault === undefined &&
      data.isActive === undefined
    ) {
      throw new ApiError(400, "Nothing to update.");
    }

    let changed = false;

    try {
      changed = await sequelize.transaction(async (transaction) => {
        // Lock the row so two requests cannot change it at the same time
        const paymentMethod = await paymentMethodRepository.findOneWithOptions({
          where: { id, tenantId, userId },
          transaction,
          lock: transaction.LOCK.UPDATE,
        });

        if (!paymentMethod) {
          throw new ApiError(404, "Payment method not found.");
        }

        const nextIsActive = data.isActive ?? paymentMethod.isActive;

        if (data.isDefault === true && !nextIsActive) {
          throw new ApiError(
            400,
            "An inactive payment method cannot be the default.",
          );
        }

        // Deactivating a method also removes its default flag
        const nextIsDefault = nextIsActive
          ? (data.isDefault ?? paymentMethod.isDefault)
          : false;
        const nextAccountName = accountName ?? paymentMethod.accountName;

        const hasChanged =
          nextAccountName !== paymentMethod.accountName ||
          nextIsActive !== paymentMethod.isActive ||
          nextIsDefault !== paymentMethod.isDefault;

        if (!hasChanged) return false;

        // Only one default per user: clear the old one first
        if (nextIsDefault && !paymentMethod.isDefault) {
          await paymentMethodRepository.update(
            { tenantId, userId, isDefault: true, id: { [Op.ne]: id } },
            { isDefault: false },
            { transaction },
          );
        }

        await paymentMethod.update(
          {
            accountName: nextAccountName,
            isActive: nextIsActive,
            isDefault: nextIsDefault,
          },
          { transaction },
        );

        // Write the audit log here, with the same transaction (see note below)

        return true;
      });
    } catch (error) {
      // Two requests set a default at the same moment, the unique index stops the second
      if (error instanceof UniqueConstraintError) {
        throw new ApiError(
          409,
          "Default payment method was changed by another request. Please try again.",
        );
      }

      throw error;
    }

    // Emit only after a successful commit
    if (changed) {
      socketService.emitToUser(userId, SocketEvent.DATA_UPDATED, {
        resource: RealtimeResource.PAYMENT_METHOD,
        action: RealtimeAction.UPDATED,
        tenantId,
      });
    }

    return null;
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

    await paymentMethodRepository.delete(
      { id, tenantId, userId },
      { force: true },
    );

    return null;
  }
}

export const paymentMethodService = new PaymentMethodService();
