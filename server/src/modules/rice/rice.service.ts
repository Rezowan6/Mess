import sequelize from "@/configs/db.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { getAppDate } from "@/utils/date.util.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import {
  RICE_PAYMENT_METHODS,
  RicePaymentMethodValue,
} from "../ricePayment/ricePayment.interface.js";
import { ricePaymentRepository } from "../ricePayment/ricePayment.repository.js";
import {
  ICreateRiceDto,
  IUpdateRiceDto,
  RICE_PURCHASE_TYPES,
  RicePaymentStatus,
  RicePaymentStatusValue,
  RicePurchaseType,
  RicePurchaseTypeValue,
} from "./rice.interface.js";
import { Rice } from "./rice.model.js";
import { riceRepository } from "./rice.repository.js";

class RiceService {
  async create(data: ICreateRiceDto) {
    const {
      tenantId,
      mealSessionId,
      quantity,
      unitPrice,
      purchaseType,
      dueDate,
      initialPaymentMethod,
      initialPaymentDate,
      initialPaymentNote,
      ...riceData
    } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    this.validatePurchase({
      quantity,
      unitPrice,
      purchaseType,
      dueDate,
    });

    if (purchaseType === RicePurchaseType.PAID && !initialPaymentMethod) {
      throw new ApiError(
        400,
        "Payment method is required for paid rice purchase.",
      );
    }

    if (purchaseType === RicePurchaseType.CREDIT) {
      if (initialPaymentMethod) {
        throw new ApiError(
          400,
          "Initial payment method is not allowed for credit rice purchase.",
        );
      }

      if (initialPaymentDate) {
        throw new ApiError(
          400,
          "Initial payment date is not allowed for credit rice purchase.",
        );
      }

      if (initialPaymentNote) {
        throw new ApiError(
          400,
          "Initial payment note is not allowed for credit rice purchase.",
        );
      }
    }

    const totalAmount = Number(
      (Number(quantity) * Number(unitPrice)).toFixed(2),
    );

    const transaction = await sequelize.transaction();

    try {
      const rice = await riceRepository.createRice(
        {
          ...riceData,
          tenantId,
          mealSessionId,
          quantity,
          unitPrice,
          totalAmount,
          purchaseType,
          paymentStatus: RicePaymentStatus.DUE,
          dueDate:
            purchaseType === RicePurchaseType.CREDIT ? (dueDate ?? null) : null,
        },
        transaction,
      );

      if (purchaseType === RicePurchaseType.PAID) {
        await ricePaymentRepository.createRicePayment(
          {
            tenantId,
            mealSessionId,
            riceId: rice.id,
            createdBy: rice.createdBy,
            amount: totalAmount,
            paymentMethod: initialPaymentMethod!,
            paymentDate: initialPaymentDate ?? new Date(),
            note: initialPaymentNote ?? null,
          },
          transaction,
        );
      }

      await this.recalculatePaymentStatus({
        tenantId,
        mealSessionId,
        id: rice.id,
        transaction,
      });

      await transaction.commit();

      socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
        resource: RealtimeResource.RICE,
        action: RealtimeAction.CREATED,
        tenantId,
        mealSessionId,
      });

      if (purchaseType === RicePurchaseType.PAID) {
        socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
          resource: RealtimeResource.RICE_PAYMENT,
          action: RealtimeAction.CREATED,
          tenantId,
          mealSessionId,
        });
      }

      return rice;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getById({
    tenantId,
    mealSessionId,
    id,
  }: {
    tenantId: number;
    mealSessionId: number;
    id: number;
  }) {
    const rice = await riceRepository.getRiceById(tenantId, mealSessionId, id);

    if (!rice) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    const [riceWithSummary] = await this.attachPaymentSummary(
      tenantId,
      mealSessionId,
      [rice],
    );

    if (!riceWithSummary) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    return riceWithSummary;
  }

  async getAll({
    tenantId,
    mealSessionId,
    page,
    limit,
    search,
  }: {
    tenantId: number;
    mealSessionId: number;
    page: number;
    limit: number;
    search?: string;
  }) {
    // Current page (filtered by search) and ALL rows (for the due summary)
    const [paginated, allRice] = await Promise.all([
      riceRepository.getPaginatedRice(tenantId, mealSessionId, {
        page,
        limit,
        ...(search && { search }),
      }),
      riceRepository.getAllRice(tenantId, mealSessionId),
    ]);

    const [data, allWithSummary] = await Promise.all([
      this.attachPaymentSummary(tenantId, mealSessionId, paginated.data),
      this.attachPaymentSummary(tenantId, mealSessionId, allRice),
    ]);

    const dueItems = allWithSummary.filter(
      (item) => Number(item.remainingDue) > 0,
    );

    const sumOf = (values: number[]) =>
      Number(values.reduce((sum, value) => sum + value, 0).toFixed(2));

    const dueSummary = {
      dueCount: dueItems.length,
      totalDue: sumOf(dueItems.map((item) => Number(item.remainingDue))),
      // All purchases together: PAID + PARTIAL + DUE
      totalAmount: sumOf(
        allWithSummary.map((item) => Number(item.totalAmount)),
      ),
      totalPaid: sumOf(allWithSummary.map((item) => Number(item.totalPaid))),
    };

    return {
      data,
      meta: paginated.meta,
      dueSummary,
    };
  }

  async update({
    tenantId,
    mealSessionId,
    id,
    data,
  }: {
    tenantId: number;
    mealSessionId: number;
    id: number;
    data: IUpdateRiceDto;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const rice = await this.ensurePurchaseAccessible(
      tenantId,
      mealSessionId,
      id,
    );

    const quantity = Number(data.quantity ?? rice.quantity);
    const unitPrice = Number(data.unitPrice ?? rice.unitPrice);
    const purchaseType = data.purchaseType ?? rice.purchaseType;
    const dueDate = data.dueDate !== undefined ? data.dueDate : rice.dueDate;

    this.validatePurchase({
      quantity,
      unitPrice,
      purchaseType,
      dueDate,
    });

    if (
      rice.purchaseType === RicePurchaseType.PAID &&
      purchaseType === RicePurchaseType.CREDIT
    ) {
      throw new ApiError(
        400,
        "A paid rice purchase cannot be changed to credit.",
      );
    }

    const totalAmount = Number((quantity * unitPrice).toFixed(2));

    const totalPaid = Number(
      (
        await ricePaymentRepository.getTotalPaid(tenantId, mealSessionId, id)
      ).toFixed(2),
    );

    if (totalAmount < totalPaid) {
      throw new ApiError(
        400,
        "Rice total amount cannot be less than total payments.",
      );
    }

    if (purchaseType === RicePurchaseType.PAID && totalPaid !== totalAmount) {
      throw new ApiError(
        400,
        "Paid rice purchase total amount must match total payments.",
      );
    }

    const updateData: any = {
      quantity,
      unitPrice,
      totalAmount,
      purchaseType,
      dueDate: purchaseType === RicePurchaseType.PAID ? null : dueDate,
    };

    if (data.supplierName !== undefined) {
      updateData.supplierName = data.supplierName;
    }

    if (data.supplierPhone !== undefined) {
      updateData.supplierPhone = data.supplierPhone;
    }

    if (data.purchaseDate !== undefined) {
      updateData.purchaseDate = data.purchaseDate;
    }

    if (data.note !== undefined) {
      updateData.note = data.note;
    }

    await sequelize.transaction(async (transaction) => {
      await riceRepository.updateRice(
        tenantId,
        mealSessionId,
        id,
        updateData,
        transaction,
      );

      await this.recalculatePaymentStatus({
        tenantId,
        mealSessionId,
        id,
        transaction,
      });
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.RICE,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async delete({
    tenantId,
    mealSessionId,
    id,
  }: {
    tenantId: number;
    mealSessionId: number;
    id: number;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    await this.ensurePurchaseAccessible(tenantId, mealSessionId, id);

    const payments = await ricePaymentRepository.getAllRicePayments(
      tenantId,
      mealSessionId,
      id,
    );

    if (payments.length > 0) {
      throw new ApiError(
        400,
        "Rice purchase cannot be deleted because payment records exist.",
      );
    }

    await riceRepository.deleteRice(tenantId, mealSessionId, id);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.RICE,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async getSummary({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    const riceRecords = await riceRepository.getAllRice(
      tenantId,
      mealSessionId,
    );

    let totalQuantity = 0;
    let totalAmount = 0;
    let totalPaid = 0;

    for (const rice of riceRecords) {
      totalQuantity += Number(rice.quantity);
      totalAmount += Number(rice.totalAmount);

      totalPaid += await ricePaymentRepository.getTotalPaid(
        tenantId,
        mealSessionId,
        rice.id,
      );
    }

    totalQuantity = Number(totalQuantity.toFixed(2));
    totalAmount = Number(totalAmount.toFixed(2));
    totalPaid = Number(totalPaid.toFixed(2));

    return {
      totalQuantity,
      totalAmount,
      totalPaid,
      totalDue: Number((totalAmount - totalPaid).toFixed(2)),
    };
  }

  async getRemainingDue({
    tenantId,
    mealSessionId,
    id,
  }: {
    tenantId: number;
    mealSessionId: number;
    id: number;
  }) {
    const rice = await this.ensurePurchaseAccessible(
      tenantId,
      mealSessionId,
      id,
    );

    const totalPaid = await ricePaymentRepository.getTotalPaid(
      tenantId,
      mealSessionId,
      id,
    );

    return Number((Number(rice.totalAmount) - totalPaid).toFixed(2));
  }

  async bulkSettleDue({
    tenantId,
    mealSessionId,
    createdBy,
    paymentMethod,
    paymentDate,
    note,
  }: {
    tenantId: number;
    mealSessionId: number;
    createdBy: number;
    paymentMethod: RicePaymentMethodValue;
    paymentDate?: Date | undefined;
    note?: string | null | undefined;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    if (!RICE_PAYMENT_METHODS.includes(paymentMethod)) {
      throw new ApiError(400, "Invalid rice payment method.");
    }

    const settledAt = paymentDate ?? getAppDate();

    const result = await sequelize.transaction(async (transaction) => {
      // Lock rows first, so a concurrent bulk settle waits and then finds nothing to settle
      const riceList = await riceRepository.getOutstandingCreditRiceForUpdate(
        tenantId,
        mealSessionId,
        transaction,
      );

      const totalsByRiceId = await ricePaymentRepository.getTotalPaidByRiceIds(
        tenantId,
        mealSessionId,
        riceList.map((rice) => rice.id),
        transaction,
      );

      // Due is always calculated on the backend from real payment history
      const dues = riceList
        .map((rice) => ({
          riceId: rice.id,
          amount: this.roundMoney(
            Number(rice.totalAmount) - (totalsByRiceId.get(rice.id) ?? 0),
          ),
        }))
        .filter((item) => item.amount > 0);

      if (dues.length === 0) {
        throw new ApiError(400, "There is no outstanding rice due to settle.");
      }

      for (const due of dues) {
        await ricePaymentRepository.createRicePayment(
          {
            tenantId,
            mealSessionId,
            riceId: due.riceId,
            createdBy,
            amount: due.amount,
            paymentMethod,
            paymentDate: settledAt,
            note: note ?? null,
          },
          transaction,
        );

        const paymentStatus = await this.recalculatePaymentStatus({
          tenantId,
          mealSessionId,
          id: due.riceId,
          transaction,
        });

        // Safety net: if any purchase is not fully settled, rollback everything
        if (paymentStatus !== RicePaymentStatus.SETTLED) {
          throw new ApiError(
            500,
            "Rice due settlement failed. No changes were saved.",
          );
        }
      }

      return {
        settledCount: dues.length,
        totalSettledAmount: this.roundMoney(
          dues.reduce((sum, item) => sum + item.amount, 0),
        ),
        paymentMethod,
        paymentDate: settledAt,
        riceIds: dues.map((item) => item.riceId),
      };
    });

    // Emit only after the transaction is committed
    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.RICE_PAYMENT,
      action: RealtimeAction.CREATED,
      tenantId,
      mealSessionId,
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.RICE,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return result;
  }

  async recalculatePaymentStatus({
    tenantId,
    mealSessionId,
    id,
    transaction,
  }: {
    tenantId: number;
    mealSessionId: number;
    id: number;
    transaction?: import("sequelize").Transaction | null;
  }) {
    const rice = await riceRepository.getRiceById(
      tenantId,
      mealSessionId,
      id,
      transaction,
    );
    if (!rice) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    const totalAmount = Number(Number(rice.totalAmount).toFixed(2));

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      throw new ApiError(
        400,
        "Rice purchase total amount must be greater than zero.",
      );
    }

    const totalPaid = Number(
      (
        await ricePaymentRepository.getTotalPaid(
          tenantId,
          mealSessionId,
          id,
          transaction,
        )
      ).toFixed(2),
    );

    if (!Number.isFinite(totalPaid) || totalPaid < 0) {
      throw new ApiError(400, "Invalid rice payment amount.");
    }

    if (totalPaid > totalAmount) {
      throw new ApiError(
        400,
        "Total rice payments cannot exceed total amount.",
      );
    }

    let paymentStatus: RicePaymentStatusValue;

    if (rice.purchaseType === RicePurchaseType.PAID) {
      if (totalPaid !== totalAmount) {
        throw new ApiError(400, "Paid rice purchase must be fully paid.");
      }

      paymentStatus = RicePaymentStatus.PAID;
    } else if (totalPaid === 0) {
      paymentStatus = RicePaymentStatus.DUE;
    } else if (totalPaid < totalAmount) {
      paymentStatus = RicePaymentStatus.PARTIAL;
    } else {
      paymentStatus = RicePaymentStatus.SETTLED;
    }

    if (rice.paymentStatus !== paymentStatus) {
      await riceRepository.updatePaymentStatus(
        tenantId,
        mealSessionId,
        id,
        paymentStatus,
        transaction,
      );
    }

    return paymentStatus;
  }
  private roundMoney(value: number): number {
    return Number(value.toFixed(2));
  }

  /**
   * Adds totalPaid and remainingDue to rice purchases using a single grouped query.
   * PAID purchases are fully paid at purchase time, so they never have due.
   */
  private async attachPaymentSummary(
    tenantId: number,
    mealSessionId: number,
    riceList: Rice[],
  ) {
    const totalsByRiceId = await ricePaymentRepository.getTotalPaidByRiceIds(
      tenantId,
      mealSessionId,
      riceList.map((rice) => rice.id),
    );

    return riceList.map((rice) => {
      const plain = rice.toJSON();
      const totalAmount = Number(plain.totalAmount);

      const totalPaid =
        plain.purchaseType === RicePurchaseType.PAID
          ? totalAmount
          : (totalsByRiceId.get(plain.id) ?? 0);

      return {
        ...plain,
        totalPaid: this.roundMoney(totalPaid),
        remainingDue: Math.max(this.roundMoney(totalAmount - totalPaid), 0),
      };
    });
  }
  private validatePurchase({
    quantity,
    unitPrice,
    purchaseType,
    dueDate,
  }: {
    quantity: number;
    unitPrice: number;
    purchaseType: RicePurchaseTypeValue;
    dueDate?: Date | null | undefined;
  }) {
    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new ApiError(400, "Rice quantity must be greater than zero.");
    }

    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      throw new ApiError(400, "Rice unit price must be greater than zero.");
    }

    if (!RICE_PURCHASE_TYPES.includes(purchaseType)) {
      throw new ApiError(400, "Invalid rice purchase type.");
    }

    if (purchaseType === RicePurchaseType.PAID && dueDate) {
      throw new ApiError(400, "Paid rice purchase cannot have a due date.");
    }
  }

  private async ensurePurchaseAccessible(
    tenantId: number,
    mealSessionId: number,
    id: number,
  ) {
    const rice = await riceRepository.getRiceById(tenantId, mealSessionId, id);

    if (!rice) {
      throw new ApiError(404, "Rice purchase not found.");
    }

    return rice;
  }
}

export const riceService = new RiceService();
