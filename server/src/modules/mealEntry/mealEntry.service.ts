import sequelize from "@/configs/db.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { mealEntryRepository } from "./mealEntry.repository.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { socketService } from "@/socket/socket.service.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { RealtimeAction, RealtimeResource } from "@/socket/realtime.constant.js";
import { mealRequestRepository } from "../mealRequest/mealRequest.repository.js";
import { ICreateMealEntryDto, IUpdateMealEntryDto } from "./mealEntry.interface.js";

class MealEntryService {
  async my({ userId, tenantId, mealSessionId }: { userId: number; tenantId: number, mealSessionId:number }) {
    return await mealEntryRepository.getMyMeal({ tenantId, userId, mealSessionId });
  }

  async getAllMembersMeal({
    mealSessionId,
    tenantId,
  }: {
    mealSessionId: number;
    tenantId: number;
  }) {
    return await mealEntryRepository.getAllMembersMeals({
      tenantId,
      mealSessionId,
    });
  }

  async todayMealEntries({ date, tenantId }: { date: Date; tenantId: number }) {
    return await sequelize.transaction(async (transaction) => {
      return await mealEntryRepository.todayMealEntries(
        { tenantId, date },
        transaction,
      );
    });
  }

  async dailySummary({ tenantId, date }: { tenantId: number; date: Date }) {
    if (!date || Number.isNaN(date.getTime())) {
      throw new ApiError(400, "Valid date is required");
    }

    return mealEntryRepository.getDailySummary(tenantId, date);
  }

  async getMemberMealSummary({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    return await mealEntryRepository.getMemberMealSummary({
      tenantId,
      mealSessionId,
      query,
    });
  }

  async memberSummary({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return mealEntryRepository.getMemberSummary(tenantId, mealSessionId);
  }

  async summary({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return mealEntryRepository.getTotalMealByMealSession(
      tenantId,
      mealSessionId,
    );
  }

  // client site not used
  async create (data: ICreateMealEntryDto) {
    const {tenantId, mealSessionId} = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    await mealEntryRepository.create({...data});

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.MEAL_ENTRY,
      action: RealtimeAction.CREATED,
      tenantId,
      mealSessionId,
    });
  }

  async update (data: IUpdateMealEntryDto) {
    const {id, tenantId, mealSessionId} = data;
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const mealEntry = await mealEntryRepository.findOne({id, tenantId, mealSessionId});

    if(!mealEntry) {
      throw new ApiError(404, "Meal Entry not found.");
    }

    await mealEntryRepository.update({id, tenantId, mealSessionId}, data)

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.MEAL_ENTRY,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return null;

  }

  async delete ({  
    id,
    tenantId,
    mealSessionId,
  }: {
    id: number;
    tenantId: number;
    mealSessionId: number;
  }){

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const mealEntry = await mealRequestRepository.findOne({id, tenantId, mealSessionId});

    if(!mealEntry) {
      throw new ApiError(404, "Meal Entry not found.");
    }

    await mealEntryRepository.delete({id, tenantId, mealSessionId});

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.MEAL_ENTRY,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    return null;
  }
}

export const mealEntryService = new MealEntryService();
