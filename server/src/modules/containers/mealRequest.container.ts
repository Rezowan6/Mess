import { MealEntry, MealRequest } from "@/models/index.js";

import { MealRequestRepository } from "@/modules/mealRequest/mealRequest.repository.js";
import { MealRequestService } from "@/modules/mealRequest/mealRequest.service.js";
import { MealEntryRepository } from "../mealEntry/mealEntry.repository.js";

const mealRequestRepository = new MealRequestRepository(MealRequest);
const mealEntryRepository = new MealEntryRepository(MealEntry);

export const mealRequestService = new MealRequestService(
  mealRequestRepository,
  mealEntryRepository,
);
