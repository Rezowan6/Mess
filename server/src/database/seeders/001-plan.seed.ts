import { Plan } from "@/models/index.js";

export async function seedPlans() {
  const plans = [
    {
      name: "Free",
      slug: "free",
      monthlyPrice: "0",
      yearlyPrice: "0",
      maxMembers: 5,
      currency: "BDT",
      durationDays: 30,
      isActive: true,
    },

    {
      name: "Standard",
      slug: "standard",
      monthlyPrice: "299.00",
      yearlyPrice: "1199.99",
      maxMembers: 50,
      currency: "BDT",
      durationDays: 30,
      isActive: true,
    },

    {
      name: "Premium",
      slug: "premium",
      monthlyPrice: "999.00",
      yearlyPrice: "9999.99",
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
