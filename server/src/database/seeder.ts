import sequelize from "@/configs/db.js";

import { seedPlans } from "./seeders/001-plan.seed.js";
import { seedFeatures } from "./seeders/002-feature.seed.js";
import { seedPlanFeatures } from "./seeders/003-planFeature.seed.js";
import { seedSystemOwner } from "./seeders/004-systemOwner.seed.js";
import { seedSystemOwnerRole } from "./seeders/005-systemOwnerRole.seed.js";

async function runSeeder() {
  try {
    await sequelize.authenticate();

    await seedPlans();

    await seedFeatures();

    await seedPlanFeatures();

    await seedSystemOwner();

    await seedSystemOwnerRole()

    console.log("Seeder completed");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
}

runSeeder();
