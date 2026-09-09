import { appTime } from "@/configs/time.js";
import { APP_TIMEZONE } from "@/utils/timezone.util.js";
import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";

const coordinates = new Coordinates(23.8103, 90.4125);

const params = CalculationMethod.MuslimWorldLeague();

const MAGHRIB_DELAY_MINUTES = 5;

/**
 * Get today's date in application timezone.
 *
 * Important:
 * Business date/time should always use APP_TIMEZONE.
 */
export const getTodayInAppTimezone = (): Date => {
  return appTime().startOf("day").toDate();
};

/**
 * Get today's Maghrib time.
 *
 * The date is calculated using the application timezone.
 */
// export const getTodayMaghribTime = (): Date => {
//   const today = appTime();

//   const prayerTimes = new PrayerTimes(coordinates, today.toDate(), params);

//   return prayerTimes.maghrib;
// };

export const getTodayMaghribTime = (): Date => {
  const today = appTime();

  const prayerDate = new Date(
    Date.UTC(today.year(), today.month(), today.date(), 12, 0, 0),
  );

  const prayerTimes = new PrayerTimes(coordinates, prayerDate, params);

  return prayerTimes.maghrib;
};
/**
 * Get the next Maghrib + configured delay.
 *
 * Example:
 *
 * Maghrib      = 6:20 PM
 * Delay        = 5 minutes
 * Job runs at  = 6:25 PM
 *
 * If today's Maghrib + delay has already passed,
 * tomorrow's Maghrib + delay will be returned.
 */
export const getNextMaghribTime = (): Date => {
  const now = appTime();

  const todayMaghrib = appTime(getTodayMaghribTime());

  const todayRunAt = todayMaghrib.add(MAGHRIB_DELAY_MINUTES, "minute");

  if (todayRunAt.isAfter(now)) {
    console.log(`[MealRequestJob] Timezone: ${APP_TIMEZONE}`);

    console.log(
      `[MealRequestJob] Today's Maghrib: ${todayMaghrib.format(
        "YYYY-MM-DD hh:mm:ss A",
      )}`,
    );

    console.log(
      `[MealRequestJob] Job will run at: ${todayRunAt.format(
        "YYYY-MM-DD hh:mm:ss A",
      )}`,
    );

    return todayRunAt.toDate();
  }

  /**
   * Today's Maghrib + delay has already passed.
   * Calculate tomorrow's Maghrib.
   */
  // const tomorrow = now.add(1, "day").startOf("day");

  // const tomorrowPrayerTimes = new PrayerTimes(
  //   coordinates,
  //   tomorrow.toDate(),
  //   params,
  // );

  const tomorrow = now.add(1, "day");

  const tomorrowPrayerDate = new Date(
    Date.UTC(tomorrow.year(), tomorrow.month(), tomorrow.date(), 12, 0, 0),
  );

  const tomorrowPrayerTimes = new PrayerTimes(
    coordinates,
    tomorrowPrayerDate,
    params,
  );

  const tomorrowMaghrib = appTime(tomorrowPrayerTimes.maghrib);

  const tomorrowRunAt = tomorrowMaghrib.add(MAGHRIB_DELAY_MINUTES, "minute");

  console.log(`[MealRequestJob] Timezone: ${APP_TIMEZONE}`);

  console.log(`[MealRequestJob] Today's Maghrib + delay already passed.`);

  console.log(
    `[MealRequestJob] Tomorrow's Maghrib: ${tomorrowMaghrib.format(
      "YYYY-MM-DD hh:mm:ss A",
    )}`,
  );

  console.log(
    `[MealRequestJob] Next job will run at: ${tomorrowRunAt.format(
      "YYYY-MM-DD hh:mm:ss A",
    )}`,
  );

  return tomorrowRunAt.toDate();
};

/**
 * ============================================================
 * TESTING ONLY
 * ============================================================
 *
 * Temporarily use this function inside getNextMaghribTime()
 * if you want to test the job without waiting for Maghrib.
 *
 * Example:
 *
 * const runAt = new Date();
 * runAt.setMinutes(runAt.getMinutes() + 1);
 * return runAt;
 *
 * Keep this commented in production.
 */

export const getTestRunTime = (): Date => {
  const runAt = new Date();

  runAt.setSeconds(runAt.getSeconds() + 100);

  console.log(
    `[MealRequestJob][TEST] Job will run at: ${runAt.toLocaleString("en-BD", {
      timeZone: APP_TIMEZONE,
    })}`,
  );

  return runAt;
};

// export const getNextMaghribTime = (): Date => {
//   const now = new Date();

//   let prayerTimes = new PrayerTimes(coordinates, now, params);

//   let runAt = new Date(prayerTimes.maghrib.getTime() + 5 * 60 * 1000);

//   if (runAt <= now) {
//     const tomorrow = new Date(now);

//     tomorrow.setDate(tomorrow.getDate() + 1);

//     prayerTimes = new PrayerTimes(coordinates, tomorrow, params);

//     runAt = new Date(prayerTimes.maghrib.getTime() + 5 * 60 * 1000);
//   }

//   return runAt;

//   // for testing---

//   // const runAt = new Date();

//   // runAt.setMinutes(runAt.getMinutes() + 1);

//   // return runAt;
// };
