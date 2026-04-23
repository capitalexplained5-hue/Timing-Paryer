/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Country from './pages/Country';
import City from './pages/City';
import { Header, Footer } from './components/HeaderFooter';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-700">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:country" element={<Country />} />
            <Route path="/:country/:city" element={<City />} />
          </Routes>
        </main>

        <Footer />
        
        {/* Background Decorative Elements */}
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-40">
          <div className="absolute top-0 right-0 h-[50rem] w-[50rem] bg-emerald-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 h-[40rem] w-[40rem] bg-slate-200 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        </div>
      </div>
    </Router>
  );
}
