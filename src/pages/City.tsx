import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Info, MapPin, Share2, Clock, Globe } from 'lucide-react';
import { getPrayerTimes, getMonthlyCalendar, TimingsResponse } from '@/src/services/aladhanApi';
import { PrayerCard } from '@/src/components/PrayerCard';
import { CountdownTimer } from '@/src/components/CountdownTimer';
import { format, parse } from 'date-fns';
import { cn } from '@/src/lib/utils';

export default function City() {
  const { country, city } = useParams<{ country: string; city: string }>();
  const [data, setData] = useState<TimingsResponse | null>(null);
  const [calendar, setCalendar] = useState<TimingsResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePrayer, setActivePrayer] = useState<string | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);

  const cityName = city?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'City';
  const countryName = country?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Country';

  useEffect(() => {
    async function fetchData() {
      if (!city || !country) return;
      setLoading(true);
      const times = await getPrayerTimes(city, country);
      setData(times);
      
      const now = new Date();
      const cal = await getMonthlyCalendar(city, country, now.getMonth() + 1, now.getFullYear());
      setCalendar(cal);
      setLoading(false);
    }
    fetchData();
  }, [city, country]);

  useEffect(() => {
    if (!data) return;

    const timings = data.timings;
    const prayerNamesList = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;
    const now = new Date();
    
    let foundActive = false;

    for (let i = 0; i < prayerNamesList.length; i++) {
        const name = prayerNamesList[i];
        const timeStr = timings[name];
        const prayerTime = parse(timeStr, 'HH:mm', now);
        
        const nextIdx = (i + 1) % prayerNamesList.length;
        const nextName = prayerNamesList[nextIdx];
        const nextTimeStr = timings[nextName];
        let nextPrayerTime = parse(nextTimeStr, 'HH:mm', now);
        
        if (nextIdx === 0) {
            nextPrayerTime = new Date(nextPrayerTime.getTime() + 24 * 60 * 60 * 1000);
        }

        if (now >= prayerTime && now < nextPrayerTime) {
            setActivePrayer(name);
            setNextPrayer({ name: nextName, time: nextTimeStr });
            foundActive = true;
            break;
        }
    }

    if (!foundActive) {
        setActivePrayer('Isha');
        setNextPrayer({ name: 'Fajr', time: timings.Fajr });
    }
  }, [data]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-full border-2 border-emerald-600/20 border-t-emerald-600 animate-spin" />
          <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase animate-pulse">Gathering Data...</p>
        </div>
      </div>
    );
  }

  if (!data) return <div className="p-20 text-center">Error loading timings. Please try again.</div>;

  const prayerNames = [
    { key: 'Fajr', label: 'Fajr' },
    { key: 'Sunrise', label: 'Sunrise' },
    { key: 'Dhuhr', label: 'Dhuhr' },
    { key: 'Asr', label: 'Asr' },
    { key: 'Maghrib', label: 'Maghrib' },
    { key: 'Isha', label: 'Isha' },
  ] as const;

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-8 grid grid-cols-12 gap-8">
      {/* Left Sidebar */}
      <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
        <section className="bg-white p-6 rounded-2xl shadow-sleek border border-slate-100">
           <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Navigation</h3>
           <Link to={`/${country}`} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors py-2 text-sm font-medium">
             <ChevronLeft size={16} />
             <span>{countryName} Directory</span>
           </Link>
           <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-900 hover:text-emerald-600 transition-all mt-4 group">
             <span className="text-xs font-bold uppercase tracking-tight">Qibla Direction</span>
             <Info size={14} className="text-slate-400 group-hover:text-emerald-600" />
           </button>
        </section>

        <section className="bg-emerald-900 text-white p-6 rounded-2xl shadow-sleek-lg relative overflow-hidden">
           <div className="relative z-10">
             <h3 className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest mb-2">Islamic Date</h3>
             <p className="text-xl font-serif leading-tight">
               {data.date.hijri.day} {data.date.hijri.month.en} <br />
               {data.date.hijri.year} {data.date.hijri.designation.abbreviated}
             </p>
             <p className="text-[10px] opacity-60 mt-6 italic font-medium italic">"Prayer is the pillar of religion."</p>
           </div>
           <div className="absolute -right-6 -bottom-6 opacity-10">
             <Globe className="w-32 h-32" />
           </div>
        </section>
      </aside>

      {/* Main Content */}
      <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
        <div className="text-center py-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{cityName}</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            {format(parse(data.date.gregorian.date, 'dd-MM-yyyy', new Date()), 'EEEE, dd MMMM yyyy')}
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-sleek-xl border border-slate-100 flex flex-col items-center relative overflow-hidden">
           {nextPrayer && (
             <CountdownTimer 
               nextPrayerName={nextPrayer.name}
               nextPrayerTime={nextPrayer.time}
             />
           )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {prayerNames.map(({ key: prayerKey, label }) => (
            <PrayerCard 
              key={prayerKey}
              name={label}
              time={data.timings[prayerKey as keyof typeof data.timings].split(' ')[0]}
              isActive={activePrayer === prayerKey}
              isNext={nextPrayer?.name === prayerKey}
            />
          ))}
        </div>
      </section>

      {/* Right Sidebar */}
      <aside className="col-span-12 lg:col-span-3 flex flex-col gap-6">
        <section className="bg-white p-6 rounded-2xl shadow-sleek border border-slate-100 flex flex-col h-full max-h-[500px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Monthly View</h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">
              {format(new Date(), 'MMMM')}
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            <div className="grid grid-cols-6 text-[10px] font-bold text-slate-300 pb-2 border-b border-slate-50 sticky top-0 bg-white z-10">
              <span>Date</span><span>Fjr</span><span>Sun</span><span>Dhr</span><span>Asr</span><span>Mag</span>
            </div>
            {calendar?.slice(0, 15).map((day, idx) => {
              const isToday = parseInt(day.date.gregorian.day) === new Date().getDate();
              return (
                <div key={idx} className={cn(
                  "grid grid-cols-6 text-[11px] font-medium py-1 items-center",
                  isToday ? "text-emerald-600 font-bold" : "text-slate-400"
                )}>
                  <span className={cn(isToday ? "text-emerald-600" : "text-slate-500")}>{day.date.gregorian.day} {day.date.gregorian.weekday.en.slice(0, 3)}</span>
                  <span>{day.timings.Fajr.split(':')[0]}:{day.timings.Fajr.split(':')[1]}</span>
                  <span>{day.timings.Sunrise.split(':')[0]}:{day.timings.Sunrise.split(':')[1]}</span>
                  <span>{day.timings.Dhuhr.split(':')[0]}:{day.timings.Dhuhr.split(':')[1]}</span>
                  <span>{day.timings.Asr.split(':')[0]}:{day.timings.Asr.split(':')[1]}</span>
                  <span>{day.timings.Maghrib.split(':')[0]}:{day.timings.Maghrib.split(':')[1]}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">SEO Insights</h3>
           <p className="text-[11px] leading-relaxed text-slate-500 font-medium italic">
             Prayer times in {cityName} today are based on the Aladhan calculation method. 
             Fajr begins at {data.timings.Fajr} and Isha at {data.timings.Isha}. Stay updated with accurate Islamic schedules for {countryName}.
           </p>
        </section>
      </aside>
    </div>
  );
}
