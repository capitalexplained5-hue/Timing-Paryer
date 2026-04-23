const BASE_URL = 'https://api.aladhan.com/v1';

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

export interface DateInfo {
  gregorian: {
    date: string;
    day: string;
    weekday: { en: string };
    month: { en: string; number: number };
    year: string;
  };
  hijri: {
    date: string;
    day: string;
    weekday: { en: string; ar: string };
    month: { en: string; ar: string };
    year: string;
    designation: { abbreviated: string };
  };
}

export interface TimingsResponse {
  timings: PrayerTimes;
  date: DateInfo;
  meta: {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
      name: string;
    };
  };
}

export async function getPrayerTimes(city: string, country: string): Promise<TimingsResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/timingsByCity?city=${city}&country=${country}&method=2`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
}

export async function getMonthlyCalendar(city: string, country: string, month: number, year: number): Promise<TimingsResponse[] | null> {
  try {
    const response = await fetch(`${BASE_URL}/calendarByCity?city=${city}&country=${country}&method=2&month=${month}&year=${year}`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching monthly calendar:', error);
    return null;
  }
}
