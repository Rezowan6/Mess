import { Plan } from "@/models/index.js";

export async function seedPlans() {
  await Plan.bulkCreate(
    [
      {
        name: "Free",
        slug: "free",
        monthlyPrice: 0,
        yearlyPrice: 0,
        maxMembers: 20,
        isActive: true,
      },

      {
        name: "Basic",
        slug: "basic",
        monthlyPrice: 9.99,
        yearlyPrice: 99.99,
        maxMembers: 100,
        isActive: true,
      },

      {
        name: "Premium",
        slug: "premium",
        monthlyPrice: 19.99,
        yearlyPrice: 199.99,
        maxMembers: -1,
        isActive: true,
      },
    ],
    {
      ignoreDuplicates: true,
    },
  );
}
