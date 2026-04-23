import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface PrayerCardProps {
  name: string;
  time: string;
  isActive?: boolean;
  isNext?: boolean;
  key?: string | number;
}

export function PrayerCard({ name, time, isActive, isNext }: PrayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 transition-all duration-300 border flex flex-col items-center text-center",
        isActive 
          ? "bg-emerald-50 border-emerald-200 shadow-sleek-lg" 
          : "bg-white border-slate-100 shadow-sleek hover:bg-slate-50"
      )}
    >
      {isActive && (
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[8px] px-2.5 py-0.5 rounded-full uppercase font-bold tracking-wider">
          Current
        </span>
      )}
      
      <p className={cn(
        "text-[10px] font-bold uppercase tracking-[0.15em] mb-2",
        isActive ? "text-emerald-600" : "text-slate-400"
      )}>
        {name}
      </p>
      <div className="flex items-baseline gap-1">
        <p className={cn(
          "text-2xl font-bold tracking-tight",
          isActive ? "text-slate-900" : "text-slate-900"
        )}>
          {time}
        </p>
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          {parseInt(time.split(':')[0]) >= 12 ? 'pm' : 'am'}
        </span>
      </div>
      
      {isNext && !isActive && (
        <div className="mt-3">
          <span className="text-[9px] font-bold uppercase tracking-tighter py-0.5 px-2 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            Next
          </span>
        </div>
      )}
    </motion.div>
  );
}
