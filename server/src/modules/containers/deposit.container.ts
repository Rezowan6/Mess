import { Deposit, MealSession } from "@/models/index.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";
import { DepositRepository } from "../deposit/deposit.repository.js";
import { DepositService } from "../deposit/deposit.service.js";

const depositRepository = new DepositRepository(Deposit);
const mealSesionRepository = new MealSessionRepository(MealSession);

export const depositService = new DepositService(
  depositRepository,
  mealSesionRepository,
);