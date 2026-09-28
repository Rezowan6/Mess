import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { ApiError } from "@/utils/ApiError.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import {
  ICreateSoldProductDto,
  IUpdateSoldProductDto,
} from "./soldProduct.interface.js";
import { soldProductRepository } from "./soldProduct.repository.js";

class SoldProductService {
  async create(data: ICreateSoldProductDto) {
    const { tenantId, mealSessionId, totalAmount } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    if (totalAmount <= 0) {
      throw new ApiError(400, "Sold product amount must be greater than zero.");
    }

    const existingSoldProduct = await soldProductRepository.getSoldProduct(
      tenantId,
      mealSessionId,
    );

    if (existingSoldProduct) {
      throw new ApiError(
        409,
        "Sold product amount already exists for this meal session.",
      );
    }

    await soldProductRepository.createSoldProduct(data);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.SOLD_PRODUCT,
      action: RealtimeAction.CREATED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async get({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const soldProduct = await soldProductRepository.getSoldProduct(
      tenantId,
      mealSessionId,
    );

    return soldProduct;
  }

  async update({
    tenantId,
    mealSessionId,
    data,
  }: {
    tenantId: number;
    mealSessionId: number;
    data: IUpdateSoldProductDto;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const soldProduct = await soldProductRepository.getSoldProduct(
      tenantId,
      mealSessionId,
    );

    if (!soldProduct) {
      throw new ApiError(404, "Sold product not found.");
    }

    if (data.totalAmount !== undefined && data.totalAmount <= 0) {
      throw new ApiError(400, "Sold product amount must be greater than zero.");
    }

    await soldProductRepository.updateSoldProduct(
      tenantId,
      mealSessionId,
      data,
    );

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.SOLD_PRODUCT,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async delete({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const soldProduct = await soldProductRepository.getSoldProduct(
      tenantId,
      mealSessionId,
    );

    if (!soldProduct) {
      throw new ApiError(404, "Sold product not found.");
    }

    await soldProductRepository.deleteSoldProduct(tenantId, mealSessionId);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.SOLD_PRODUCT,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    return null;
  }
}

export const soldProductService = new SoldProductService();
