import { MemberStatus } from "@/constans/index.js";
import { User } from "@/models/index.js";

export async function seedSystemOwner() {
  const email = "mdrezowanmiya11@gmail.com";

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    console.log(" System owner already exists");
    return;
  }

  const password = "@rezowan123";

  await User.create({
    name: "System Owner",
    email,
    password,
    status: MemberStatus.ACTIVE,
    isVerified: true,
  });

  console.log("✅ System owner seeded successfully");
}
