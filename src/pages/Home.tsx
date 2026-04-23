import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, MapPin, TrendingUp, Globe, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const POPULAR_COUNTRIES = [
  { name: 'Pakistan', code: 'PK', cities: ['Karachi', 'Lahore', 'Islamabad', 'Multan'] },
  { name: 'Saudi Arabia', code: 'SA', cities: ['Makkah', 'Madinah', 'Riyadh', 'Jeddah'] },
  { name: 'United Kingdom', code: 'GB', cities: ['London', 'Birmingham', 'Manchester', 'Glasgow'] },
  { name: 'United States', code: 'US', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston'] },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      // Simplified search logic: assume first word is city, second is country or default to Pakistan for demo
      const parts = search.split(',');
      const city = parts[0]?.trim();
      const country = parts[1]?.trim() || 'Pakistan';
      navigate(`/${country.toLowerCase().replace(/ /g, '-')}/${city.toLowerCase().replace(/ /g, '-')}`);
    }
  };

  return (
    <div className="pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-widest uppercase mb-6 border border-emerald-100">
            Accurate & Reliable
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Global <span className="text-emerald-600">Prayer</span> <br />
            <span className="text-slate-400 italic font-serif">Timings Hub</span>
          </h1>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your city (e.g. Multan, Pakistan)"
              className="w-full h-14 bg-slate-100 border border-slate-200 rounded-full pl-16 pr-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500/50 transition-all text-sm font-medium"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-colors text-xs uppercase tracking-widest"
            >
              Search
            </button>
          </form>
        </motion.div>
      </section>

      {/* Popular Section */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-10">
          <TrendingUp className="text-emerald-600" size={20} />
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Popular Locations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {POPULAR_COUNTRIES.map((country, idx) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sleek hover:shadow-sleek-lg transition-all"
            >
              <Link to={`/${country.name.toLowerCase().replace(/ /g, '-')}`} className="block mb-6 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <MapPin size={20} />
                  </div>
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{country.code}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{country.name}</h3>
              </Link>
              
              <ul className="space-y-2">
                {country.cities.map(city => (
                  <li key={city}>
                    <Link 
                      to={`/${country.name.toLowerCase().replace(/ /g, '-')}/${city.toLowerCase().replace(/ /g, '-')}`}
                      className="text-[13px] font-medium text-slate-500 hover:text-emerald-600 flex items-center justify-between group py-1"
                    >
                      <span>{city}</span>
                      <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">GO</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="max-w-7xl mx-auto px-8 mt-40 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Globe size={24} />}
            title="Global Coverage"
            description="Access prayer timings for over 250,000 cities across every country on the planet."
          />
          <FeatureCard 
            icon={<Clock size={24} />}
            title="Real-time Countdowns"
            description="Smart countdown timers to help you prepare for the next prayer precisely on time."
          />
          <FeatureCard 
            icon={<TrendingUp size={24} />}
            title="Reliable Data"
            description="Using trusted calculation methods approved by major Islamic institutions worldwide."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="text-center md:text-left">
      <div className="h-14 w-14 rounded-2xl bg-white shadow-sleek border border-slate-100 flex items-center justify-center text-emerald-600 mb-6 mx-auto md:mx-0">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight uppercase">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
