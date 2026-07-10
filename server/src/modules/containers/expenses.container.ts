import { Expenses, MealSession } from "@/models/index.js";
import { ExpensesRepository } from "../expenses/expenses.repository.js";
import { ExpensesService } from "../expenses/expenses.service.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";

const expensesRepository = new ExpensesRepository(Expenses);
const mealSesionRepository = new MealSessionRepository(MealSession);

export const expensesService = new ExpensesService(
  expensesRepository,
  mealSesionRepository,
);
