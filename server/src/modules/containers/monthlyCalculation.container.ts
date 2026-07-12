import { Expenses,Deposit, MealEntry, MealSession } from "@/models/index.js";
import { ExpensesRepository } from "../expenses/expenses.repository.js";
import { MonthlyCalculationService } from "../monthlyCalculation/monthlyCalculation.service.js";
import { DepositRepository } from "../deposit/deposit.repository.js";
import { MealEntryRepository } from "../mealEntry/mealEntry.repository.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";

const expensesRepository = new ExpensesRepository(Expenses);
const depositRepository = new DepositRepository(Deposit);
const mealEnryRepository = new MealEntryRepository(MealEntry);
const mealSessionRepository = new MealSessionRepository(MealSession);

export const monthlyCalculationService = new MonthlyCalculationService(
  expensesRepository,
  depositRepository,
  mealEnryRepository,
  mealSessionRepository,
);