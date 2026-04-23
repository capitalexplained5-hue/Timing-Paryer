import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Globe, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Globe className="text-white" size={22} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 uppercase">
            PRAYER<span className="text-emerald-600">TIMES</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/pakistan" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Pakistan</Link>
          <Link to="/saudi-arabia" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Saudi Arabia</Link>
          <Link to="/united-kingdom" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">United Kingdom</Link>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">My Location</button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="h-10 w-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <Search size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Globe className="text-white" size={22} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 uppercase">
                PRAYER<span className="text-emerald-600">TIMES</span>
              </span>
            </div>
            <p className="text-slate-500 text-[13px] leading-relaxed max-w-md">
              Providing accurate global prayer times using scientific calculation methods. 
              Our mission is to help Muslims stay connected to their faith with precise timing.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Home</Link></li>
              <li><Link to="/pakistan" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Countries</Link></li>
              <li><Link to="/about" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-widest mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">API Docs</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Islamic Calendar</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[11px] text-slate-400 font-medium">© 2026 PrayerTimes Global. All times calculated using Aladhan API.</p>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-slate-400 font-medium hover:text-emerald-600 transition-colors uppercase tracking-widest">Twitter</a>
            <a href="#" className="text-[11px] text-slate-400 font-medium hover:text-emerald-600 transition-colors uppercase tracking-widest">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
