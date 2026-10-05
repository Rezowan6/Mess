import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { isWithinHours } from "@/utils/date.util.js";
import { IMealSessionReq } from "../mealSession/mealSession.interface.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { CreateExpensesDto, UpdateExpenseDto } from "./expenses.interface.js";
import { expensesRepository } from "./expenses.repository.js";

class ExpensesService {
  async create(data: CreateExpensesDto) {
    const { tenantId, expenseDate, mealSessionId } = data;

    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const count = await expensesRepository.todayExpensesCount({
      tenantId,
      expenseDate,
      mealSessionId,
    });

    if (count >= 3) {
      throw new ApiError(
        409,
        `Maximum ${count} expenses can be created for this day.`,
      );
    }

    const result = await expensesRepository.create({
      ...data,
    });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EXPENSE,
      action: RealtimeAction.CREATED,
      tenantId,
      mealSessionId,
    });

    return result;
  }

  async getAll({
    tenantId,
    mealSessionId,
    query,
  }: {
    tenantId: number;
    mealSessionId: number;
    query: IPaginationQuery;
  }) {
    const expenses = await expensesRepository.getAll(
      tenantId,
      mealSessionId,
      query,
    );

    if (!expenses) {
      throw new ApiError(404, "Expense not found.");
    }
    return expenses;
  }

  async getById({
    id,
    tenantId,
    mealSessionId,
  }: {
    id: number;
    tenantId: number;
    mealSessionId: number;
  }) {
    const expense = await expensesRepository.getById(
      id,
      tenantId,
      mealSessionId,
    );

    if (!expense) {
      throw new ApiError(404, "Expense not found.");
    }

    return expense;
  }

  async update({
    id,
    tenantId,
    mealSessionId,
    data,
  }: {
    id: number;
    tenantId: number;
    mealSessionId: number;
    data: UpdateExpenseDto;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);

    const expense = await expensesRepository.getById(
      id,
      tenantId,
      mealSessionId,
    );

    if (!expense) {
      throw new ApiError(404, "Expense not found.");
    }

    if (data.amount !== undefined && data.amount <= 0) {
      throw new ApiError(400, "Amount must be greater than zero.");
    }

    if (!isWithinHours(expense.createdAt, 24)) {
      throw new ApiError(
        409,
        "This expense can only be updated within 24 hours of creation.",
      );
    }
    await expensesRepository.update({ id, tenantId, mealSessionId }, data);

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EXPENSE,
      action: RealtimeAction.UPDATED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async delete({
    id,
    tenantId,
    mealSessionId,
  }: {
    id: number;
    tenantId: number;
    mealSessionId: number;
  }) {
    await mealSessionRepository.ensureSessionOpen(tenantId, mealSessionId);
    const expense = await expensesRepository.getById(
      id,
      tenantId,
      mealSessionId,
    );

    if (!expense) {
      throw new ApiError(404, "Expense not found.");
    }

    if (!isWithinHours(expense.createdAt, 24)) {
      throw new ApiError(
        409,
        "This expense can no longer be deleted because the 24-hour deletion period has expired.",
      );
    }

    await expensesRepository.delete({ id, tenantId, mealSessionId });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.EXPENSE,
      action: RealtimeAction.DELETED,
      tenantId,
      mealSessionId,
    });

    return null;
  }

  async summary({
    tenantId,
    mealSessionId,
    session,
  }: {
    tenantId: number;
    mealSessionId: number;
    session?: IMealSessionReq | undefined;
  }) {
    const totalExpense = await expensesRepository.getTotalExpenseByMealSession(
      tenantId,
      mealSessionId,
    );

    const totalExpenseCount =
      await expensesRepository.getExpenseCountByMealSession(
        tenantId,
        mealSessionId,
      );

    const categories = await expensesRepository.getCategoryWiseExpense(
      tenantId,
      mealSessionId,
    );

    return {
      mealSession: {
        id: session?.id,
        month: session?.month,
        year: session?.year,
        status: session?.status,
      },

      totalExpense,
      totalExpenseCount,
      categories,
    };
  }
}

export const expenseService = new ExpensesService();
