import { MealRequest, MealSession, MealEntry } from "@/models/index.js";

import { MealRequestRepository } from "@/modules/mealRequest/mealRequest.repository.js";
import { MealRequestService } from "@/modules/mealRequest/mealRequest.service.js";
import { MealSessionRepository } from "@/modules/mealSession/mealSession.repository.js";
import { MealEntryRepository } from "../mealEntry/mealEntry.repository.js";

const mealRequestRepository = new MealRequestRepository(MealRequest);
const mealEntryRepository = new MealEntryRepository(MealEntry);

const mealSessionRepository = new MealSessionRepository(MealSession);

export const mealRequestService = new MealRequestService(
  mealRequestRepository,
  mealSessionRepository,
  mealEntryRepository,
);
