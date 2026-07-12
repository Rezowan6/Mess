import { MealSession } from "../mealSession/mealSession.model.js";
import { MealSessionRepository } from "../mealSession/mealSession.repository.js";
import { MealSessionService } from "../mealSession/MealSession.service.js";

export const mealSessionRepository = new MealSessionRepository(MealSession);

export const mealSessionService = new MealSessionService(mealSessionRepository);
