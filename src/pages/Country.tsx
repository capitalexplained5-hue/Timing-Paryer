import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, ArrowLeft, Globe } from 'lucide-react';

const CITIES_BY_COUNTRY: Record<string, string[]> = {
  'pakistan': ['Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Peshawar', 'Multan', 'Hyderabad', 'Islamabad', 'Quetta'],
  'saudi-arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Sultanah', 'Dammam', 'Taif', 'Tabuk', 'Buraidah', 'Khamis Mushait'],
  'united-kingdom': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Newcastle', 'Sheffield', 'Liverpool', 'Leeds', 'Bristol', 'Leicester'],
};

export default function Country() {
  const { country } = useParams<{ country: string }>();
  const countryName = country?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Country';
  
  const cities = CITIES_BY_COUNTRY[country?.toLowerCase() || ''] || [];

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-8">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors mb-12 group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Back to Directory</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <Globe size={20} />
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Country Directory</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Explore <span className="text-emerald-600">{countryName}</span> <br />
          <span className="text-slate-400 italic font-serif">Prayer Times</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cities.map((city, idx) => (
          <motion.div
            key={city}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link 
              to={`/${country}/${city.toLowerCase().replace(/ /g, '-')}`}
              className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sleek hover:shadow-sleek-lg hover:border-emerald-500/20 hover:bg-emerald-50/30 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{city}</span>
              </div>
              <span className="text-slate-300 font-light group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">→</span>
            </Link>
          </motion.div>
        ))}
        
        {cities.length === 0 && (
          <div className="col-span-full py-20 text-center rounded-3xl bg-white border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No popular cities found for this country yet.</p>
            <Link to="/" className="text-emerald-600 text-xs font-bold uppercase tracking-widest mt-4 inline-block hover:underline">Search for any city</Link>
          </div>
        )}
      </div>

      <div className="mt-20 p-12 rounded-[2.5rem] bg-white border border-slate-100 shadow-sleek -mx-4 md:mx-0">
        <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Religious Context in {countryName}</h2>
        <div className="prose prose-slate max-w-none text-slate-500 text-sm leading-relaxed">
          <p className="mb-4">
            Finding accurate prayer times in {countryName} is essential for daily worship. Our platform provides 
            precise schedules for Fajr, Dhuhr, Asr, Maghrib, and Isha based on reliable scientific methods approved by your region's leading Islamic authorities.
          </p>
          <p>
            The prayer timings vary depending on the geographical location and seasonal shifts throughout the year. 
            By choosing your city, you access real-time countdowns, Islamic calendar integrations, and specific method details tailored for {countryName}.
          </p>
        </div>
      </div>
    </div>
  );
}
