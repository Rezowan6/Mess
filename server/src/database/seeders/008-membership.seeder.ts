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
        slug: "test-mess",
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
            "admin@gmail.com",
            "manager@gmail.com",
            "messmalik@gmail.com",
            "member1@gmail.com",
            "member2@gmail.com",
            "member3@gmail.com",
            "member4@gmail.com",
            "member5@gmail.com",
          ],
        },
      },
      transaction,
    });

    if (users.length !== 8) {
      throw new Error(
        `Expected 8 test users, but found ${users.length}. Run user seeder first.`,
      );
    }

    const roleMap: Record<string, MemberShipRole> = {
      "admin@gmail.com": MemberRole.ADMIN,
      "manager@gmail.com": MemberRole.MANAGER,
      "messmalik@gmail.com": MemberRole.MESS_MALIK,
      "member1@gmail.com": MemberRole.MEMBER,
      "member2@gmail.com": MemberRole.MEMBER,
      "member3@gmail.com": MemberRole.MEMBER,
      "member4@gmail.com": MemberRole.MEMBER,
      "member5@gmail.com": MemberRole.MEMBER,
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
