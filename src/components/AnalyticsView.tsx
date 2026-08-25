import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  ArrowUpRight
} from 'lucide-react';
import { Reservation, MenuItem } from '../types';

interface AnalyticsViewProps {
  reservations: Reservation[];
  menuItems: MenuItem[];
  onNavigateToReservations: () => void;
  onNavigateToMenu: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  reservations,
  menuItems,
  onNavigateToMenu
}) => {
  const confirmedCount = reservations.filter(r => r.status === 'Confirmed').length;
  const pendingCount = reservations.filter(r => r.status === 'Pending').length;
  const totalGuests = reservations.reduce((acc, r) => acc + r.partySize, 0) + 384;
  const avgPartySize = (totalGuests / (reservations.length + 96)).toFixed(1);

  return (
    <div className="flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1A1A1A]/10 gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-[#1A1A1A]/50 font-sans">
            Selection 05 / Gastronomic Intelligence
          </div>
          <h2 className="font-serif italic text-[32px] md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[0.95]">
            Dining Analytics & Performance
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium max-w-xl mt-2">
            Real-time reservations volume, table velocity, and popular menu offerings.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#1A1A1A]/15 px-4 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A] shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]/70" />
          <span>Period: August 2026</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bento-card p-6 rounded-md shadow-2xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em]">Total Guests Served</span>
            <Users className="w-4 h-4 text-[#1A1A1A]/60" />
          </div>
          <div className="font-serif text-[40px] font-normal text-[#1A1A1A] tracking-tight mb-1 leading-none">{totalGuests}</div>
          <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% vs last cycle
          </div>
        </div>

        <div className="bento-card p-6 rounded-md shadow-2xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em]">Avg Party Size</span>
            <Users className="w-4 h-4 text-[#1A1A1A]/60" />
          </div>
          <div className="font-serif text-[40px] font-normal text-[#1A1A1A] tracking-tight mb-1 leading-none">{avgPartySize}</div>
          <div className="text-[11px] text-[#1A1A1A]/60 font-medium mt-2">Optimal for traditional mesob 4-tops</div>
        </div>

        <div className="bento-card p-6 rounded-md shadow-2xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em]">Confirmed Bookings</span>
            <TrendingUp className="w-4 h-4 text-emerald-800" />
          </div>
          <div className="font-serif text-[40px] font-normal text-[#1A1A1A] tracking-tight mb-1 leading-none">{confirmedCount + 42}</div>
          <div className="text-[11px] text-[#1A1A1A]/60 font-medium mt-2">{pendingCount} currently pending verification</div>
        </div>

        <div className="bento-card p-6 rounded-md shadow-2xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em]">Est. Table Velocity</span>
            <DollarSign className="w-4 h-4 text-[#1A1A1A]/60" />
          </div>
          <div className="font-serif text-[34px] font-normal text-[#1A1A1A] tracking-tight mb-1 leading-none">428,500 <span className="text-[16px] font-mono font-medium text-[#1A1A1A]/60">ETB</span></div>
          <div className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" /> +9.2% weekly expansion
          </div>
        </div>
      </div>

      {/* Analytical Charts / Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Peak Hours Breakdown */}
        <div className="bento-card lg:col-span-8 p-8 rounded-md shadow-2xs">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-[#1A1A1A]/50">
            Occupancy Flow
          </div>
          <h3 className="font-serif italic text-[22px] font-normal text-[#1A1A1A] mb-1">
            Peak Seating & Dining Cycles
          </h3>
          <p className="text-[13px] text-[#1A1A1A]/70 mb-6 font-medium">
            Hourly dining hall occupancy rate on weekdays vs traditional banquet weekends.
          </p>

          <div className="space-y-4 font-sans">
            {[
              { time: '12:00 PM - 02:30 PM (Lunch Service & Buffet)', percentage: 85, width: '85%' },
              { time: '04:00 PM - 06:00 PM (Coffee & Traditional Jebena)', percentage: 65, width: '65%' },
              { time: '07:00 PM - 09:30 PM (Prime Dinner & Signature Kitfo Rush)', percentage: 98, width: '98%' },
              { time: '10:00 PM - 12:00 AM (Late Night Gurage Hospitality)', percentage: 72, width: '72%' },
            ].map((slot, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-[12px] font-bold text-[#1A1A1A]">
                  <span>{slot.time}</span>
                  <span className="font-mono text-[#1A1A1A]">{slot.percentage}% Capacity</span>
                </div>
                <div className="w-full bg-[#EFECE5] h-2.5 rounded-full overflow-hidden border border-[#1A1A1A]/10">
                  <div 
                    className="h-full bg-[#1A1A1A] rounded-full transition-all duration-1000" 
                    style={{ width: slot.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Dishes */}
        <div className="bento-card lg:col-span-4 p-8 rounded-md shadow-2xs flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-[#1A1A1A]/50">
              Patron Favorites
            </div>
            <h3 className="font-serif italic text-[22px] font-normal text-[#1A1A1A] mb-1">
              Top Ordered Offerings
            </h3>
            <p className="text-[13px] text-[#1A1A1A]/70 mb-4 font-medium">
              Ranked by patron order volume and repeat table requests.
            </p>

            <div className="space-y-2.5">
              {menuItems.slice(0, 4).map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-md bg-[#FFFFFF] border border-[#1A1A1A]/10 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif italic text-[14px] font-bold text-[#1A1A1A]">0{idx + 1}</span>
                    <span className="text-[13px] font-bold text-[#1A1A1A] line-clamp-1">{item.name}</span>
                  </div>
                  <span className="font-mono text-[12px] font-bold text-[#1A1A1A]">{item.price} ETB</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onNavigateToMenu}
            className="w-full mt-6 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCF5] text-[11px] font-bold tracking-[0.2em] uppercase rounded-md transition-colors shadow-2xs"
          >
            Manage Catalog & Specials
          </button>
        </div>
      </div>
    </div>
  );
};
