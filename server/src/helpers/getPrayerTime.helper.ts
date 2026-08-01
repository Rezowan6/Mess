import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";

export const getMaghribTime = (date: Date): Date => {
  const coordinates = new Coordinates(
    Number(process.env.LATITUDE),
    Number(process.env.LONGITUDE),
  );

  const params = CalculationMethod.MuslimWorldLeague();

  const prayerTimes = new PrayerTimes(coordinates, date, params);

  return prayerTimes.maghrib;
};
