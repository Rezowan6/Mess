import { ApiError } from "@/utils/ApiError.js";
import { CreateExpensesDto } from "./expenses.interface.js";
import { ExpensesRepository } from "./expenses.repository.js";

export class ExpensesService {
  constructor(private readonly expensesRepository: ExpensesRepository) {}

  async create(data: CreateExpensesDto) {
    const { tenantId, expensesDate } = data;
    const count = await this.expensesRepository.todayExpensesCount({
      tenantId,
      expensesDate,
    });

    if (count >= 3) {
      throw new ApiError(409, `Today expenses created max limit ${count}.`);
    }
    return await this.expensesRepository.createExpenses({ ...data });
  }
}
