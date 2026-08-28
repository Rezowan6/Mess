import { User } from "@/models/index.js";

export async function seedSystemOwnerRole() {
  const email = "mdrezowanmiya11@gmail.com";

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    console.log("❌ System owner user not found");
    return;
  }

  await user.update({
    role: "systemOwner",
  });

  console.log("✅ System owner role updated successfully");
}
