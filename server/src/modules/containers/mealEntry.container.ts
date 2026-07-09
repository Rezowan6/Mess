import { MealEntry } from "@/models/index.js";
import { MealEntryRepository } from "../mealEntry/mealEntry.repository.js";
import { MealEntryService } from "../mealEntry/mealEntry.service.js";

const mealEntryRepository = new MealEntryRepository(MealEntry);

export const mealEntryService = new MealEntryService(mealEntryRepository);
