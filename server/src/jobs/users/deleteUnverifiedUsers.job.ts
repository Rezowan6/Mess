import { userService } from "@/modules/user/user.service.js";
import cron from "node-cron";

// "*/30 * * * * *"
// এটা দিলে প্রতি 30 সেকেন্ডে cron job run করবে।

export const deleteUnverifiedUsersJob = () => {
  cron.schedule(
    "*/5 * * * *", //প্রতি ৫ মিনিটে একবার run করবে।
    async () => {
      try {
        const deletedCount =
          await userService.deleteUnverifiedInactiveUsers();

        console.log(
          `[CRON] Deleted ${deletedCount} unverified inactive users.`,
        );
      } catch (error) {
        console.error("[CRON] Failed to delete unverified users:", error);
      }
    },
    {
      name: "delete-unverified-inactive-users",
      timezone: "Asia/Dhaka",
      noOverlap: true,
    },
  );
};