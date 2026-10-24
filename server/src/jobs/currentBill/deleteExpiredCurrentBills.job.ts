import { env } from "@/configs/env.js";
import { currentBillService } from "@/modules/currentBill/currentBill.service.js";
import { logger } from "@/utils/logger.js";
import cron from "node-cron";

export const deleteExpiredCurrentBillsJob = (): void => {
  cron.schedule(
    "0 22 * * *",
    async () => {
      try {
        const deletedCount =
          await currentBillService.purgeExpiredDeletedCurrentBills();

        logger.info(
          {
            deletedCount,
            retentionDays: 7,
          },
          "Expired soft-deleted current bills permanently deleted",
        );
      } catch (error) {
        logger.error(
          { error },
          "Failed to permanently delete expired current bills",
        );
      }
    },
    {
      name: "delete-expired-current-bills",
      timezone: env.APP_TIMEZONE,
      noOverlap: true,
    },
  );
};
