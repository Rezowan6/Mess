import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";

const coordinates = new Coordinates(23.8103, 90.4125);

const params = CalculationMethod.MuslimWorldLeague();

export const getNextMaghribTime = (): Date => {
  const now = new Date();

  let prayerTimes = new PrayerTimes(coordinates, now, params);

  let runAt = new Date(prayerTimes.maghrib.getTime() + 5 * 60 * 1000);

  if (runAt <= now) {
    const tomorrow = new Date(now);

    tomorrow.setDate(tomorrow.getDate() + 1);

    prayerTimes = new PrayerTimes(coordinates, tomorrow, params);

    runAt = new Date(prayerTimes.maghrib.getTime() + 5 * 60 * 1000);
  }

  return runAt;

  // const runAt = new Date();

  // runAt.setMinutes(runAt.getMinutes() + 1);

  // return runAt;
};
