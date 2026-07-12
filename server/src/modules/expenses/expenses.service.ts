import { ApiError } from "@/utils/ApiError.js";
import { isWithinHours } from "@/utils/date.util.js";
import {
  IMealSessionReq,
  MealSessionStatus,
} from "../mealSession/mealSession.interface.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";
import { CreateExpensesDto, UpdateExpenseDto } from "./expenses.interface.js";
import { ExpensesRepository } from "./expenses.repository.js";

export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly mealSessionRepository: MealSessionRepository,
  ) {}

  async create(data: CreateExpensesDto) {
    const { tenantId, expenseDate, mealSessionId } = data;

    const count = await this.expensesRepository.todayExpensesCount({
      tenantId,
      expenseDate,
      mealSessionId,
    });

    if (count >= 3) {
      throw new ApiError(409, `Today expenses created max limit ${count}.`);
    }
    return await this.expensesRepository.createExpenses({
      ...data,
    });
  }

  async getAll({
    tenantId,
    mealSessionId,
  }: {
    tenantId: number;
    mealSessionId: number;
  }) {
    return this.expensesRepository.getAll(tenantId, mealSessionId);
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
    const expense = await this.expensesRepository.getById(
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
    const expense = await this.expensesRepository.getById(
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

    const mealSession = await this.mealSessionRepository.findById(
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
    return this.expensesRepository.updateExpense(id, data);
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
    const expense = await this.expensesRepository.getById(
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

    const mealSession = await this.mealSessionRepository.findById(
      expense.mealSessionId,
    );

    if (mealSession?.status === MealSessionStatus.CLOSED) {
      throw new ApiError(
        400,
        "Cannot delete expense from a closed meal session.",
      );
    }

    await this.expensesRepository.deleteExpense(id);

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
    const totalExpense =
      await this.expensesRepository.getTotalExpenseByMealSession(
        tenantId,
        mealSessionId,
      );

    const totalExpenseCount =
      await this.expensesRepository.getExpenseCountByMealSession(
        tenantId,
        mealSessionId,
      );

    const categories = await this.expensesRepository.getCategoryWiseExpense(
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
