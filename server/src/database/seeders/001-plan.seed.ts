import { Plan } from "@/models/index.js";

export async function seedPlans() {
  const plans = [
    {
      name: "Free",
      slug: "free",
      monthlyPrice: "0",
      yearlyPrice: "0",
      maxMembers: 8,
      currency: "BDT",
      durationDays: 30,
      isActive: true,
    },

    {
      name: "Basic",
      slug: "basic",
      monthlyPrice: "39.99",
      yearlyPrice: "199.99",
      maxMembers: 30,
      currency: "BDT",
      durationDays: 30,
      isActive: true,
    },

    {
      name: "Premium",
      slug: "premium",
      monthlyPrice: "59.99",
      yearlyPrice: "299.99",
      maxMembers: -1,
      currency: "BDT",
      durationDays: 30,
      isActive: true,
    },
  ];

  for (const plan of plans) {
    await Plan.upsert(plan);
  }

  console.log("✅ Plans seeded successfully");
}
