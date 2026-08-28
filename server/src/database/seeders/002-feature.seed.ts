import { Feature } from "@/models/index.js";

export async function seedFeatures() {
  const featuers = [
    {
      name: "Dashboard",
      slug: "dashboard",
    },

    {
      name: "Advanced Report",
      slug: "advanced_report",
    },
    {
      name: "Expense Management",
      slug: "expense_management",
    },

    {
      name: "Export Report",
      slug: "export_report",
    },

    {
      name: "Unlimited Member",
      slug: "unlimited_member",
    },
  ];

  for (const feature of featuers) {
    await Feature.upsert(feature);
  }

  console.log("✅ Feature seeded successfully");
}
