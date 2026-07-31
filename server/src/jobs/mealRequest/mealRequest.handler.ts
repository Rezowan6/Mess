import { mealGeneratorService } from "@/modules/mealGenerator/mealGenerator.service.js";
import { tenantRepository } from "@/modules/tenant/tenant.repository.js";

export const runMealRequestGeneration = async () => {
  console.log("Meal request generation started");

  const tenants = await tenantRepository.getActiveTenants();

  const today = new Date();

  for (const tenant of tenants) {
    await mealGeneratorService.generateDailyMealRequests({
      tenantId: tenant.id,
      date: today,
    });
  }

  console.log("Meal request generation completed");
};
