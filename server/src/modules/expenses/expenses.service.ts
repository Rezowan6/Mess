import { IPaginationQuery } from "@/common/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { isWithinHours } from "@/utils/date.util.js";
import {
  IMealSessionReq,
  MealSessionStatus,
} from "../mealSession/mealSession.interface.js";
import { mealSessionRepository } from "../mealSession/mealSession.repository.js";
import { CreateExpensesDto, UpdateExpenseDto } from "./expenses.interface.js";
import { expensesRepository } from "./expenses.repository.js";

class ExpensesService {
  async create(data: CreateExpensesDto) {
    const { tenantId, expenseDate, mealSessionId } = data;

    const count = await expensesRepository.todayExpensesCount({
      tenantId,
      expenseDate,
      mealSessionId,
    });

    if (count >= 3) {
      throw new ApiError(409, `Today expenses created max limit ${count}.`);
    }
    return await expensesRepository.create({
      ...data,
    });
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
      throw new ApiError(404, "Expense not foudn.");
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

    const mealSession = await mealSessionRepository.findById(
      expense.mealSessionId,
    );

    if (mealSession?.status === MealSessionStatus.CLOSED) {
      throw new ApiError(
        400,
        "Cannot update expense of a closed meal session.",
      );
    }
    if (!isWithinHours(expense.createdAt, 24)) {
      throw new ApiError(
        409,
        "This expense can only be updated within 24 hours of creation.",
      );
    }
    await expensesRepository.update({ id }, data);

    return await expensesRepository.findById(id);
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

    const mealSession = await mealSessionRepository.findById(
      expense.mealSessionId,
    );

    if (mealSession?.status === MealSessionStatus.CLOSED) {
      throw new ApiError(
        400,
        "Cannot delete expense from a closed meal session.",
      );
    }

    await expensesRepository.delete({ id });

    return null;
  }

  async summary({
    tenantId,
    mealSessionId,
    session,
  }: {
    tenantId: number;
    mealSessionId: number;
    session: IMealSessionReq;
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
