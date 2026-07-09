import { MealRequest, MealSession } from "@/models/index.js";

import { MealRequestRepository } from "@/modules/mealRequest/mealRequest.repository.js";
import { MealRequestService } from "@/modules/mealRequest/mealRequest.service.js";
import { MealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";

const mealRequestRepository = new MealRequestRepository(MealRequest);

const mealSessionRepository = new MealSessionRepository(MealSession);

export const mealRequestService = new MealRequestService(
  mealRequestRepository,
  mealSessionRepository,
);
