import { ApiError } from "@/utils/ApiError.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";
import { CreateExpensesDto } from "./expenses.interface.js";
import { ExpensesRepository } from "./expenses.repository.js";

export class ExpensesService {
  constructor(
    private readonly expensesRepository: ExpensesRepository,
    private readonly mealSessionRepository: MealSessionRepository,
  ) {}

  async create(data: CreateExpensesDto) {
    const { tenantId, expensesDate } = data;

    const currentSession =
      await this.mealSessionRepository.getCurrentSession(tenantId);

    if (!currentSession) {
      throw new ApiError(404, "Meal session open not found.");
    }

    const count = await this.expensesRepository.todayExpensesCount({
      tenantId,
      expensesDate,
    });

    if (count >= 3) {
      throw new ApiError(409, `Today expenses created max limit ${count}.`);
    }
    return await this.expensesRepository.createExpenses({
      ...data,
      mealSessionId: currentSession.id,
    });
  }

  async getAll({ tenantId }: { tenantId: number }) {
    return this.expensesRepository.getAll(tenantId);
  }
}
