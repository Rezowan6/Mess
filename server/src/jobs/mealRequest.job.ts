import { mealGeneratorService } from "@/modules/mealGenerator/mealGenerator.service.js";
import { tenantRepository } from "@/modules/tenant/tenant.repository.js";
import cron from "node-cron";

export const startMealRequestJob = () => {
  cron.schedule("1 0 * * *", async () => {
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
  });
};
