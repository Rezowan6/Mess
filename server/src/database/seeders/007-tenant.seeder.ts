import sequelize from "@/configs/db.js";
import { Tenant } from "@/modules/tenant/tenant.model.js";

export const seedTenant = async () => {
  const transaction = await sequelize.transaction();

  try {
    const [tenant] = await Tenant.findOrCreate({
      where: {
        slug: "shamsul-huda-mess",
      },
      defaults: {
        name: "Shamsul Huda",
        slug: "shamsul-huda-mess",
        status: "active",
      },
      transaction,
    });

    await transaction.commit();

    console.log("✅ Test tenant seeded successfully.");

    return tenant;
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Tenant seeding failed:", error);
    throw error;
  }
};
