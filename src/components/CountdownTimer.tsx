import { useEffect, useState } from 'react';
import { differenceInSeconds, parse, startOfToday } from 'date-fns';
import { motion } from 'motion/react';

interface CountdownTimerProps {
  nextPrayerName: string;
  nextPrayerTime: string;
}

export function CountdownTimer({ nextPrayerName, nextPrayerTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!nextPrayerTime) return;
      
      const now = new Date();
      const nextTime = parse(nextPrayerTime, 'HH:mm', now);
      
      let diff = differenceInSeconds(nextTime, now);
      
      if (diff < 0) {
        diff += 86400;
      }
      
      setTimeLeft(diff);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [nextPrayerTime]);

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return (
    <div className="text-center py-6">
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Live Countdown</span>
      </div>
      
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-4">Next: {nextPrayerName} in</p>
      
      <div className="flex justify-center items-center gap-4">
        <TimeUnit value={h} label="Hr" />
        <span className="text-3xl font-black text-slate-200 mb-6">:</span>
        <TimeUnit value={m} label="Min" />
        <span className="text-3xl font-black text-slate-200 mb-6">:</span>
        <TimeUnit value={s} label="Sec" />
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-6 border border-slate-200/50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "66%" }}
          className="bg-emerald-500 h-full"
        />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        key={value}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-5xl font-black text-slate-900 tracking-tighter"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 mt-1">{label}</span>
    </div>
  );
}
