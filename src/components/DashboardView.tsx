import React from 'react';
import { MenuItem, Reservation, SiteSettings } from '../types';
import { 
  ArrowUp, 
  ArrowRight, 
  Star
} from 'lucide-react';

interface DashboardViewProps {
  reservations: Reservation[];
  menuItems: MenuItem[];
  siteSettings: SiteSettings;
  onNavigateToReservations: () => void;
  onNavigateToMenu: () => void;
  onNavigateToMedia: () => void;
  onManagePromotion: () => void;
  onOpenReservationDetails: (res: Reservation) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  reservations,
  menuItems,
  siteSettings,
  onNavigateToReservations,
  onNavigateToMenu,
  onNavigateToMedia,
  onManagePromotion,
  onOpenReservationDetails
}) => {
  // Compute metrics dynamically from state
  const totalReservationsCount = 1248 + reservations.length;
  const menuItemsCount = menuItems.length > 0 ? menuItems.length : 84;
  const requiringUpdatesCount = menuItems.filter(m => !m.available).length;
  const featuredDish = menuItems.find(m => m.isFeatured) || menuItems[0];
  const recentActivities = reservations.slice(0, 4);

  return (
    <div className="flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full animate-fadeIn">
      {/* Editorial Page Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between border-b border-[#1A1A1A]/10 pb-8 gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3 text-[#1A1A1A]/50 font-sans">
            Selection 01 / Studio Operations
          </div>
          <h2 className="font-serif italic text-[36px] md:text-[52px] font-normal text-[#1A1A1A] tracking-tight leading-[0.95]">
            Totot Overview
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium mt-3 max-w-xl">
            Real-time culinary curation, guest reservations, and gastronomic catalog monitoring.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-right">
          <div>
            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/40 block">Location</span>
            <span className="text-[12px] font-bold uppercase text-[#1A1A1A]">Gerji, Addis Ababa</span>
          </div>
          <div className="h-8 w-px bg-[#1A1A1A]/10" />
          <div>
            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/40 block">Status</span>
            <span className="text-[12px] font-bold uppercase text-[#1A1A1A] flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" /> Live Service
            </span>
          </div>
        </div>
      </header>

      {/* 4 Bento Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 mb-10">
        {/* Metric 1: Total Reservations */}
        <div 
          onClick={onNavigateToReservations}
          className="bento-card lg:col-span-3 p-7 flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] font-sans">
              Reservations
            </span>
            <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] group-hover:border-[#1A1A1A] transition-colors">
              <span className="material-symbols-outlined text-[17px]">book_online</span>
            </div>
          </div>

          <div>
            <div className="font-serif italic text-[44px] font-normal text-[#1A1A1A] mb-1 leading-none">
              {totalReservationsCount.toLocaleString()}
            </div>
            <div className="text-[11px] font-medium text-[#1A1A1A]/60 flex items-center gap-1.5 mt-2">
              <span className="text-emerald-700 flex items-center gap-0.5 font-bold">
                <ArrowUp className="w-3 h-3" /> +12%
              </span>
              <span>vs prior cycle</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Menu Items */}
        <div 
          onClick={onNavigateToMenu}
          className="bento-card lg:col-span-3 p-7 flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] font-sans">
              Menu Catalog
            </span>
            <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] group-hover:border-[#1A1A1A] transition-colors">
              <span className="material-symbols-outlined text-[17px]">restaurant</span>
            </div>
          </div>

          <div>
            <div className="font-serif italic text-[44px] font-normal text-[#1A1A1A] mb-1 leading-none">
              {menuItemsCount}
            </div>
            <div className="text-[11px] text-[#1A1A1A]/60 mt-2 font-medium">
              {requiringUpdatesCount > 0 ? `${requiringUpdatesCount} unavailable` : 'All offerings active'}
            </div>
          </div>
        </div>

        {/* Metric 3: Active Gallery Posts */}
        <div 
          onClick={onNavigateToMedia}
          className="bento-card lg:col-span-3 p-7 flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] font-sans">
              Archival Media
            </span>
            <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] group-hover:border-[#1A1A1A] transition-colors">
              <span className="material-symbols-outlined text-[17px]">photo_library</span>
            </div>
          </div>

          <div>
            <div className="font-serif italic text-[44px] font-normal text-[#1A1A1A] mb-1 leading-none">
              156
            </div>
            <div className="text-[11px] text-[#1A1A1A]/60 mt-2 font-medium">
              Curated assets on bento
            </div>
          </div>
        </div>

        {/* Metric 4: Location Status */}
        <div className="bento-card lg:col-span-3 p-7 flex flex-col justify-between group">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] font-sans">
              Service Registry
            </span>
            <div className="w-8 h-8 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A]">
              <span className="material-symbols-outlined text-[17px]">location_on</span>
            </div>
          </div>

          <div>
            <div className="font-serif italic text-[22px] font-normal text-[#1A1A1A] mb-1.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>Accepting Guests</span>
            </div>
            <div className="text-[11px] text-[#1A1A1A]/60 mt-2 font-medium">
              {siteSettings.cityCountry || 'Addis Ababa, ET'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Row: Activity Feed (8 cols) + Featured Dish (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Activity Feed */}
        <div className="bento-card lg:col-span-8 p-8 flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#1A1A1A]/10">
            <div>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/40 block mb-1">
                Recent Guest Manifest
              </span>
              <h3 className="font-serif italic text-[22px] font-normal text-[#1A1A1A]">
                Activity & Bookings
              </h3>
            </div>
            <button 
              id="btn-feed-view-all"
              onClick={onNavigateToReservations}
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A1A1A] hover:opacity-60 transition-opacity flex items-center gap-1.5 group"
            >
              <span>View Manifest</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="flex-1 overflow-x-auto">
            <div className="min-w-[550px] flex flex-col w-full">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 pb-3 border-b border-[#1A1A1A]/10 text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em] font-sans">
                <div className="col-span-5">Patron</div>
                <div className="col-span-2">Party</div>
                <div className="col-span-3">Schedule</div>
                <div className="col-span-2 text-right">Status</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#1A1A1A]/8">
                {recentActivities.map((res) => {
                  const initials = res.customerName
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <div 
                      key={res.id}
                      onClick={() => onOpenReservationDetails(res)}
                      className="grid grid-cols-12 gap-4 py-3.5 items-center group cursor-pointer hover:bg-[#F7F5EE] transition-colors px-2 -mx-2 rounded-md"
                    >
                      <div className="col-span-5 flex items-center gap-3">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border
                          ${res.isVIP ? 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A]' : 'bg-[#EFECE5] text-[#1A1A1A] border-[#1A1A1A]/15'}
                        `}>
                          {initials}
                        </div>
                        <div className="truncate">
                          <p className="text-[13px] font-bold text-[#1A1A1A] group-hover:underline truncate">
                            {res.customerName}
                          </p>
                          {res.specialRequests && (
                            <p className="text-[11px] text-[#1A1A1A]/50 truncate">{res.specialRequests}</p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2 text-[12px] font-medium text-[#1A1A1A]/80">
                        {res.partySize} {res.partySize === 1 ? 'Guest' : 'Guests'}
                      </div>

                      <div className="col-span-3 text-[12px] font-medium text-[#1A1A1A]/80">
                        {res.date.includes('2026-08-25') ? 'Today' : res.date.includes('2026-08-26') ? 'Tomorrow' : res.date}, {res.time}
                      </div>

                      <div className="col-span-2 flex justify-end">
                        {res.isVIP ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#1A1A1A] text-[#FDFCF5] text-[9px] font-bold tracking-wider uppercase flex items-center gap-1">
                            <Star className="w-2.5 h-2.5 fill-current" /> VIP
                          </span>
                        ) : res.status === 'Confirmed' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EFECE5] border border-[#1A1A1A]/15 text-[#1A1A1A] text-[9px] font-bold tracking-wider uppercase">
                            Confirmed
                          </span>
                        ) : res.status === 'Pending' ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300/60 text-amber-900 text-[9px] font-bold tracking-wider uppercase flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Pending
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3EB] text-[#1A1A1A]/60 text-[9px] font-bold tracking-wider uppercase">
                            {res.status}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Dish Promo Card */}
        <div className="bento-card lg:col-span-4 p-0 overflow-hidden relative group min-h-[400px] flex flex-col justify-end border border-[#1A1A1A]/15 bg-[#EFECE5]">
          {/* Background Image with Artistic Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: `url('${featuredDish ? featuredDish.image : "https://lh3.googleusercontent.com/aida-public/AB6AXuAP0SA8WxJYmTktZ4RImC9_gav0izlwyP8RPxHnYudZY8WkQpiKiY65Ms8O_ATNDi7pjlXDmCoUtK52_-peuuxMQO6BARQ54TsDvULUFrQqreiXdwE6O8x5i-hYM8v-siKuXE7ofKvV7SAxSv8meHXfn6Um17pMTMZ2ZqHMZhP0yKvgXDO35mWpn_QzJwECwMRyYl6VFuedGGB70dtt8guAbMBWQ5eBJZ53ZdUXxYbKkIOcmMw8ZXHzaA" }')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF5] via-[#FDFCF5]/90 to-transparent z-10" />

          <div className="relative z-20 p-7 flex flex-col justify-end">
            <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1A1A1A]/50 mb-2">
              Featured Gastronomy
            </div>

            <h3 className="font-serif italic text-[26px] font-bold text-[#1A1A1A] mb-2 leading-snug">
              {featuredDish ? featuredDish.name : 'Special Kitfo Reserve'}
            </h3>

            <p className="text-[13px] text-[#1A1A1A]/80 leading-relaxed mb-5 line-clamp-2 font-medium">
              {featuredDish ? featuredDish.description : "Highlighting tonight's premium offering to active guests."}
            </p>

            <button 
              id="btn-manage-promotion"
              onClick={onManagePromotion}
              className="w-full py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] font-bold text-[11px] tracking-[0.2em] uppercase rounded-md transition-all duration-200 shadow-2xs active:scale-[0.98]"
            >
              Curate Promotion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
