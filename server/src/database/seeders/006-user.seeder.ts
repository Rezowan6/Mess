import sequelize from "@/configs/db.js";
import { MemberRole } from "@/constans/index.js";
import { User } from "@/modules/user/user.model.js";

export const seedUsers = async () => {
  const transaction = await sequelize.transaction();

  try {
    const users = [
      {
        name: "Test Admin",
        email: "admin@gmail.com",
        password: "test@123456",
        role: MemberRole.ADMIN,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Test Manager",
        email: "manager@gmail.com",
        password: "test@123456",
        role: MemberRole.MANAGER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Test Mess-malik",
        email: "messmalik@gmail.com",
        password: "test@123456",
        role: MemberRole.MANAGER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Test Member 1",
        email: "member1@gmail.com",
        password: "test@123456",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Test Member 2",
        email: "member2@gmail.com",
        password: "test@123456",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Test Member 3",
        email: "member3@gmail.com",
        password: "test@123456",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Test Member 4",
        email: "member4@gmail.com",
        password: "test@123456",
        role: MemberRole.MEMBER,
        status: "active" as const,
        isVerified: true,
      },
      {
        name: "Test Member 5",
        email: "member5@gmail.com",
        password: "test@123456",
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
