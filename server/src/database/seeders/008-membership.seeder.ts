import sequelize from "@/configs/db.js";
import { MemberRole, MemberStatus } from "@/constans/index.js";
import { Tenant } from "@/modules/tenant/tenant.model.js";
import { MemberShipRole } from "@/modules/tenantMembership/tenantMembership.interface.js";
import { TenantMembership } from "@/modules/tenantMembership/tenantMembership.model.js";
import { User } from "@/modules/user/user.model.js";
import { Op } from "sequelize";

export const seedMemberships = async () => {
  const transaction = await sequelize.transaction();

  try {
    const tenant = await Tenant.findOne({
      where: {
        slug: "shamsul-huda-mess",
      },
      transaction,
    });

    if (!tenant) {
      throw new Error("Test tenant not found. Run tenant seeder first.");
    }

    const users = await User.findAll({
      where: {
        email: {
          [Op.in]: [
            "rezowan@gmail.com",
            "maruf1@gmail.com",
            "kauser@gmail.com",
            "sojib@gmail.com",
            "maruf2@gmail.com",
            "tamim@gmail.com",
            "ehasan@gmail.com",
            "apon@gmail.com",
            "tajmir@gmail.com",
            "rafi@gmail.com",
            "riyad@gmail.com",
            "amirhamja@gmail.com",
            "abdulahad@gmail.com",
            "salman@gmail.com",
            "reajul@gmail.com",
            "sakil@gmail.com",
            "khokon@gmail.com",
            "ripon@gmail.com",
            "sourov@gmail.com",
          ],
        },
      },
      transaction,
    });

    if (users.length !== 19) {
      throw new Error(
        `Expected 19 test users, but found ${users.length}. Run user seeder first.`,
      );
    }

    const roleMap: Record<string, MemberShipRole> = {
      "rezowan@gmail.com": MemberRole.ADMIN,
      "maruf1@gmail.com": MemberRole.MANAGER,
      "kauser@gmail.com": MemberRole.MESS_MALIK,

      "sojib@gmail.com": MemberRole.MEMBER,
      "maruf2@gmail.com": MemberRole.MEMBER,
      "tamim@gmail.com": MemberRole.MEMBER,
      "ehasan@gmail.com": MemberRole.MEMBER,
      "apon@gmail.com": MemberRole.MEMBER,
      "tajmir@gmail.com": MemberRole.MEMBER,
      "rafi@gmail.com": MemberRole.MEMBER,
      "riyad@gmail.com": MemberRole.MEMBER,
      "amirhamja@gmail.com": MemberRole.MEMBER,
      "abdulahad@gmail.com": MemberRole.MEMBER,
      "salman@gmail.com": MemberRole.MEMBER,
      "reajul@gmail.com": MemberRole.MEMBER,
      "sakil@gmail.com": MemberRole.MEMBER,
      "khokon@gmail.com": MemberRole.MEMBER,
      "ripon@gmail.com": MemberRole.MEMBER,
      "sourov@gmail.com": MemberRole.MEMBER,
    };

    const memberships = [];

    for (const user of users) {
      const [membership] = await TenantMembership.findOrCreate({
        where: {
          tenantId: tenant.id,
          userId: user.id,
        },
        defaults: {
          tenantId: tenant.id,
          userId: user.id,
          role: roleMap[user.email],
          status: MemberStatus.ACTIVE,
          joinedAt: new Date(),
          invitedBy: null,
        },
        transaction,
      });

      memberships.push(membership);
    }

    await transaction.commit();

    console.log("✅ Test memberships seeded successfully.");

    return memberships;
  } catch (error) {
    await transaction.rollback();

    console.error("❌ Membership seeding failed:", error);

    throw error;
  }
};
