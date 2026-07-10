import { Expenses } from "@/models/index.js";
import { ExpensesRepository } from "../expenses/expenses.repository.js";
import { ExpensesService } from "../expenses/expenses.service.js";

const expensesRepository = new ExpensesRepository(Expenses);

export const expensesService = new ExpensesService(expensesRepository);
