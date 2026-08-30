import sequelize from "@/configs/db.js";
import { MemberRole } from "@/constans/index.js";
import { User } from "@/modules/user/user.model.js";

export const seedUsers = async () => {
  const transaction = await sequelize.transaction();

  try {
    const users = [
      {
        name: "Md Rezowan Miya",
        email: "rezowan@gmail.com",
        password: "@rezowan123",
        role: MemberRole.ADMIN,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Maruf Ahamed",
        email: "maruf1@gmail.com",
        password: "@maruf123",
        role: MemberRole.MANAGER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Abdullah Kauser",
        email: "kauser@gmail.com",
        password: "@kauser123",
        role: MemberRole.MESS_MALIK,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Sojib Ahamed",
        email: "sojib@gmail.com",
        password: "@sojib123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Maruf Islam ET",
        email: "maruf2@gmail.com",
        password: "@rezowan123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Tamim Ahamed",
        email: "tamim@gmail.com",
        password: "@tamim123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Ehasan Ahamed",
        email: "ehasan@gmail.com",
        password: "@ehasan123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Apon Ahamed",
        email: "apon@gmail.com",
        password: "@apon123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Tajmir Ahamed",
        email: "tajmir@gmail.com",
        password: "@tajmir123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Kauser Ahamed ENT",
        email: "kauser@gmail.com",
        password: "@kauser123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Rafi Islam",
        email: "rafi@gmail.com",
        password: "@rafi123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Riyad Ahamed",
        email: "riyad@gmail.com",
        password: "@riyad123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Amir Hamja Islam",
        email: "amirhamja@gmail.com",
        password: "@amirhamja123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Abdul Ahad Islam",
        email: "abdulahad@gmail.com",
        password: "@abdulahad123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Salman Ahamed",
        email: "salman@gmail.com",
        password: "@salman123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Reajul Islam",
        email: "reajul@gmail.com",
        password: "@reajul123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Sakil Ahamed",
        email: "sakil@gmail.com",
        password: "@sakil123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Khokon Islam",
        email: "khokon@gmail.com",
        password: "@khokon123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Ripon Ahamed",
        email: "ripon@gmail.com",
        password: "@ripon123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Md Sourov Islam",
        email: "sourov@gmail.com",
        password: "@sourov123",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
    ];

    const createdUsers = [];

    for (const userData of users) {
      const [user] = await User.findOrCreate({
        where: {
          email: userData.email,
        },
        defaults: userData,
        transaction,
      });

      createdUsers.push(user);
    }

    await transaction.commit();

    console.log("✅ Test users seeded successfully.");

    return createdUsers;
  } catch (error) {
    await transaction.rollback();
    console.error("❌ User seeding failed:", error);
    throw error;
  }
};
