import { Feature } from "@/models/index.js";

export async function seedFeatures() {
  await Feature.bulkCreate(
    [
      {
        name: "Dashboard",
        slug: "dashboard",
      },

      {
        name: "Advanced Report",
        slug: "advanced_report",
      },

      {
        name: "Export Report",
        slug: "export_report",
      },

      {
        name: "Unlimited Member",
        slug: "unlimited_member",
      },
    ],
    {
      ignoreDuplicates: true,
    },
  );
}
