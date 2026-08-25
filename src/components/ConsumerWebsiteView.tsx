import React, { useState } from 'react';
import { MenuItem, CategoryType, SiteSettings, MediaItem, Reservation } from '../types';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Check, 
  Sparkles, 
  Calendar, 
  Users, 
  ChefHat
} from 'lucide-react';

interface ConsumerWebsiteViewProps {
  menuItems: MenuItem[];
  siteSettings: SiteSettings;
  mediaItems: MediaItem[];
  onReturnToAdmin: () => void;
  onSubmitReservation: (newRes: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
}

export const ConsumerWebsiteView: React.FC<ConsumerWebsiteViewProps> = ({
  menuItems,
  siteSettings,
  mediaItems,
  onReturnToAdmin,
  onSubmitReservation
}) => {
  const [activeMenuTab, setActiveMenuTab] = useState<CategoryType>('specialties');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resGuests, setResGuests] = useState('2 People');
  const [resDate, setResDate] = useState('2026-08-25');
  const [resTime, setResTime] = useState('19:30');
  const [resRequests, setResRequests] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredMenuItems = menuItems.filter(
    item => item.category === activeMenuTab && item.available
  );

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const guestNumber = parseInt(resGuests.split(' ')[0], 10) || 2;
      onSubmitReservation({
        customerName: resName,
        contactPhone: resPhone,
        partySize: guestNumber,
        date: resDate,
        time: resTime,
        specialRequests: resRequests,
        isVIP: guestNumber >= 6
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setResName('');
      setResPhone('');
      setResRequests('');
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF5] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-[#FDFCF5] relative overflow-x-hidden">
      {/* Top Admin Control Bar */}
      <div className="sticky top-0 z-50 bg-[#EFECE5]/95 border-b border-[#1A1A1A]/10 px-6 py-3 flex items-center justify-between backdrop-blur-xs shadow-2xs">
        <button
          id="btn-return-admin"
          onClick={onReturnToAdmin}
          className="flex items-center gap-2 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF5] text-[11px] font-bold tracking-[0.2em] uppercase transition-colors bg-[#FFFFFF] px-4 py-2 rounded-md border border-[#1A1A1A]/15 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Totot Management Console</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-[#1A1A1A]/70 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Live Consumer Site Preview • Real-time DB Synced</span>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="px-6 md:px-12 py-6 max-w-[1400px] mx-auto flex items-center justify-between border-b border-[#1A1A1A]/10">
        <a href="#top" className="font-serif italic text-[26px] font-normal text-[#1A1A1A] tracking-tight">
          Totot <span className="font-sans font-bold text-[11px] uppercase tracking-[0.25em] text-[#1A1A1A]/50 not-italic ml-1">Cultural Dining</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/70">
          <a href="#tradition" className="hover:text-[#1A1A1A] transition-colors">The Heritage</a>
          <a href="#menu" className="hover:text-[#1A1A1A] transition-colors">Menu Catalog</a>
          <a href="#location" className="hover:text-[#1A1A1A] transition-colors">Gerji Location</a>
          <a href="#gallery" className="hover:text-[#1A1A1A] transition-colors">Guest Gallery</a>
        </nav>

        <a 
          href="#reserve" 
          className="px-5 py-2.5 rounded-md bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCF5] text-[11px] font-bold tracking-[0.2em] uppercase transition-all shadow-2xs active:scale-95"
        >
          Reserve Table
        </a>
      </header>

      {/* Hero Section */}
      <section id="top" className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden border-b border-[#1A1A1A]/10">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 z-0 opacity-15">
          <img 
            src="https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg" 
            alt="Totot Kitfo Atmosphere" 
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center animate-fadeIn">
          <div className="flex items-center gap-2.5 text-[#1A1A1A]/60 text-[10px] font-bold tracking-[0.3em] uppercase mb-6 font-sans">
            <span className="w-5 h-[1px] bg-[#1A1A1A]/40" />
            <span>EST. ADDIS ABABA · GURAGE CULINARY TRADITION</span>
            <span className="w-5 h-[1px] bg-[#1A1A1A]/40" />
          </div>

          <h1 className="font-serif italic text-[48px] sm:text-[72px] lg:text-[92px] font-normal text-[#1A1A1A] tracking-tight leading-[0.95] mb-6">
            Timeless Tradition.<br />
            <span className="not-italic font-normal text-[#1A1A1A]">
              Authentic Kitfo.
            </span>
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[#1A1A1A]/75 max-w-2xl font-medium leading-relaxed mb-10">
            Totot brings the ancient Gurage art of kitfo to Gerji — finely minced tenderloin, warmed gently with seasoned niter kibbeh and fragrant mitmita, served on fresh enset banana leaf.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="#menu" 
              className="px-8 py-3.5 rounded-md bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCF5] text-[11px] font-bold tracking-[0.2em] uppercase transition-all shadow-2xs active:scale-95"
            >
              Explore Menu
            </a>
            <a 
              href="#location" 
              className="px-8 py-3.5 rounded-md bg-[#FFFFFF] hover:bg-[#EFECE5] border border-[#1A1A1A]/15 text-[#1A1A1A] text-[11px] font-bold tracking-[0.2em] uppercase transition-all shadow-2xs"
            >
              Find Us in Gerji
            </a>
          </div>
        </div>
      </section>

      {/* The Craft / Bento Section */}
      <section id="tradition" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-[#1A1A1A]/10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#1A1A1A]/50 uppercase mb-3 font-sans">THE CULINARY CRAFT</p>
          <h2 className="font-serif italic text-[36px] sm:text-[48px] font-normal text-[#1A1A1A] leading-[1.05] mb-4">
            Three principles we never compromise.
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium">
            Every dish at Totot honors Gurage culinary discipline — slow clarified butter, pristine cuts, and genuine warmth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 */}
          <div className="bento-card p-8 flex flex-col justify-between group rounded-md shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.25em]">Manifest 01</span>
              <h3 className="font-serif italic text-[24px] font-normal text-[#1A1A1A] mt-2 mb-2">
                Hand-Minced Signature Kitfo
              </h3>
              <p className="text-[13px] text-[#1A1A1A]/70 font-medium leading-relaxed">
                Finely minced tenderloin, seasoned to order with clarified spiced butter and mitmita — served raw (tire), lightly warmed (leb-leb), or fully cooked.
              </p>
            </div>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvv2p3Y0bwHcgqLT29PHl6660A-ekamYuu2BhMraCWfRn0gk84eRluhNCgT_ZE0Vxt8jBk0BRjzhrxD4bUI7rZoEhEcOOAAEbZau7yOFoNuVQP5A0BjMCKiFaNqcFyKk6qGoVrPAww_T-BUn95kQg963bqsW4r_XnB7Zek2EpHKpnBz7h49CbGR2r4kmWmfxJAZVVU0rzM_T9xr2bYR5cwt15eJt095jhP4vlL3pfsmdlytix0Lt1bUw" 
              alt="Totot Signature Kitfo" 
              className="w-full h-48 object-cover rounded-md mt-6 border border-[#1A1A1A]/10 group-hover:scale-[1.01] transition-transform duration-300 shadow-2xs"
            />
          </div>

          {/* Bento Card 2 */}
          <div className="bento-card p-8 flex flex-col justify-between group rounded-md shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.25em]">Manifest 02</span>
              <h3 className="font-serif italic text-[24px] font-normal text-[#1A1A1A] mt-2 mb-2">
                Gomen Besiga, Kocho & Ayib
              </h3>
              <p className="text-[13px] text-[#1A1A1A]/70 font-medium leading-relaxed">
                Traditional artisanal cottage cheese, fresh enset flatbread (kocho), and slow-braised collards prepared according to heirloom recipes.
              </p>
            </div>
            <img 
              src="https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/Gomen_besiga.jpg" 
              alt="Gomen Besiga & Ayib" 
              className="w-full h-48 object-cover rounded-md mt-6 border border-[#1A1A1A]/10 group-hover:scale-[1.01] transition-transform duration-300 shadow-2xs"
            />
          </div>

          {/* Bento Card 3 */}
          <div className="bento-card p-8 flex flex-col justify-between group rounded-md shadow-2xs">
            <div>
              <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.25em]">Manifest 03</span>
              <h3 className="font-serif italic text-[24px] font-normal text-[#1A1A1A] mt-2 mb-2">
                Traditional Mesob Ambience
              </h3>
              <p className="text-[13px] text-[#1A1A1A]/70 font-medium leading-relaxed">
                Authentic Gurage hospitality — hand-woven mesob baskets, ceremonial clay Jebena coffee roasting, and shared communal dining.
              </p>
            </div>
            <img 
              src="https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg" 
              alt="Cultural Atmosphere" 
              className="w-full h-48 object-cover rounded-md mt-6 border border-[#1A1A1A]/10 group-hover:scale-[1.01] transition-transform duration-300 shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-[#1A1A1A]/10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#1A1A1A]/50 uppercase mb-3 font-sans">DINING CATALOG</p>
          <h2 className="font-serif italic text-[36px] sm:text-[48px] font-normal text-[#1A1A1A] leading-[1.05] mb-3">
            Handcrafted to order.
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium">
            All prices listed in Ethiopian Birr (ETB). Every plate is prepared fresh by our master culinary artisans.
          </p>
        </div>

        {/* Menu Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          <button
            onClick={() => setActiveMenuTab('specialties')}
            className={`px-6 py-2.5 rounded-md text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${
              activeMenuTab === 'specialties'
                ? 'bg-[#1A1A1A] text-[#FDFCF5] shadow-2xs'
                : 'text-[#1A1A1A]/70 bg-[#FFFFFF] border border-[#1A1A1A]/15 hover:bg-[#EFECE5]'
            }`}
          >
            Specialties
          </button>
          <button
            onClick={() => setActiveMenuTab('sides')}
            className={`px-6 py-2.5 rounded-md text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${
              activeMenuTab === 'sides'
                ? 'bg-[#1A1A1A] text-[#FDFCF5] shadow-2xs'
                : 'text-[#1A1A1A]/70 bg-[#FFFFFF] border border-[#1A1A1A]/15 hover:bg-[#EFECE5]'
            }`}
          >
            Accompaniments
          </button>
          <button
            onClick={() => setActiveMenuTab('drinks')}
            className={`px-6 py-2.5 rounded-md text-[11px] font-bold tracking-[0.2em] uppercase transition-all ${
              activeMenuTab === 'drinks'
                ? 'bg-[#1A1A1A] text-[#FDFCF5] shadow-2xs'
                : 'text-[#1A1A1A]/70 bg-[#FFFFFF] border border-[#1A1A1A]/15 hover:bg-[#EFECE5]'
            }`}
          >
            Drinks & Coffee Ceremony
          </button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenuItems.map((item) => (
            <div 
              key={item.id}
              className="bento-card p-6 rounded-md flex justify-between items-start gap-6 hover:bg-[#FFFFFF] transition-colors shadow-2xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-[19px] font-bold text-[#1A1A1A]">
                    {item.name}
                  </h4>
                  {item.isFeatured && (
                    <span className="text-[9px] uppercase font-bold tracking-wider text-[#FDFCF5] bg-[#1A1A1A] px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[#1A1A1A]/70 mt-2 font-medium leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
              <div className="font-mono text-[16px] font-bold text-[#1A1A1A] whitespace-nowrap pt-1">
                {item.price.toFixed(0)} ETB
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Table Reservation Form Section */}
      <section id="reserve" className="py-24 px-6 md:px-12 max-w-[800px] mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#1A1A1A]/50 uppercase mb-3 font-sans">TABLE RESERVATION</p>
          <h2 className="font-serif italic text-[36px] sm:text-[48px] font-normal text-[#1A1A1A] leading-[1.05] mb-3">
            Book your table.
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium">
            Reserve ahead for family mesobs, VIP gatherings, or business lunches.
          </p>
        </div>

        <form onSubmit={handleReservationSubmit} className="bento-card p-8 sm:p-12 rounded-md shadow-2xs border-[#1A1A1A]/15">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2">
                Full Name
              </label>
              <input 
                type="text" 
                required
                value={resName}
                onChange={(e) => setResName(e.target.value)}
                placeholder="e.g. Dr. Yohannes Berhane"
                className="bento-input w-full p-3 rounded-md text-[13px] text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2">
                Phone Number
              </label>
              <input 
                type="tel" 
                required
                value={resPhone}
                onChange={(e) => setResPhone(e.target.value)}
                placeholder="+251 91 123 4567"
                className="bento-input w-full p-3 rounded-md text-[13px] text-[#1A1A1A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2">
                Party Size
              </label>
              <select
                value={resGuests}
                onChange={(e) => setResGuests(e.target.value)}
                className="bento-input w-full p-3 rounded-md text-[13px] text-[#1A1A1A] cursor-pointer"
              >
                <option>1 Person</option>
                <option>2 People</option>
                <option>3 People</option>
                <option>4 People</option>
                <option>5 People</option>
                <option>6 People (VIP)</option>
                <option>8+ People (VIP)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2">
                Date
              </label>
              <input 
                type="date" 
                required
                value={resDate}
                onChange={(e) => setResDate(e.target.value)}
                className="bento-input w-full p-3 rounded-md text-[13px] text-[#1A1A1A] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2">
                Time
              </label>
              <input 
                type="time" 
                required
                value={resTime}
                onChange={(e) => setResTime(e.target.value)}
                className="bento-input w-full p-3 rounded-md text-[13px] text-[#1A1A1A] cursor-pointer"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2">
              Special Requests (Optional)
            </label>
            <input 
              type="text" 
              value={resRequests}
              onChange={(e) => setResRequests(e.target.value)}
              placeholder="e.g. Traditional mesob table, mild mitmita spice, birthday ceremony"
              className="bento-input w-full p-3 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-md bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCF5] text-[11px] font-bold tracking-[0.2em] uppercase transition-all shadow-2xs active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Confirming with Dining Room...' : 'Confirm Reservation'}
          </button>

          {isSubmitted && (
            <div className="mt-4 p-4 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 text-[13px] text-center font-bold animate-fadeIn shadow-2xs">
              ✓ Thank you! Your booking has been registered with Totot Cultural Restaurant's front desk.
            </div>
          )}
        </form>
      </section>

      {/* Location & Contact Section */}
      <section id="location" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-[#1A1A1A]/10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#1A1A1A]/50 uppercase mb-3 font-sans">LOCATION & CONTACT</p>
          <h2 className="font-serif italic text-[36px] sm:text-[48px] font-normal text-[#1A1A1A] leading-[1.05]">
            Visit us in Gerji.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Map Embed Card */}
          <div className="relative w-full min-h-[380px] rounded-md overflow-hidden border border-[#1A1A1A]/15 shadow-2xs">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548235482103!2d38.8021!3d9.0125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85aaf301d009%3A0x6b2e3edb57c74dbd!2sTotot%20Traditional%20Restaurant!5e0!3m2!1sen!2set!4v1710000000000!5m2!1sen!2set" 
              className="w-full h-full min-h-[380px] border-0"
              title="Totot Location Map"
            />
            <a 
              href="https://maps.google.com/?q=Totot+Traditional+Restaurant+Gerji+Addis+Ababa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 right-4 bg-[#FFFFFF]/95 border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FDFCF5] py-3 px-4 rounded-md text-[11px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all shadow-2xs backdrop-blur-xs"
            >
              <span>📍 View Totot Location & Reviews on Google Maps ↗</span>
            </a>
          </div>

          {/* Location Details */}
          <div className="flex flex-col gap-4">
            <div className="bento-card p-6 rounded-md shadow-2xs">
              <p className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-1 font-sans">Address</p>
              <h3 className="font-serif text-[20px] font-bold text-[#1A1A1A] mb-1">Gerji / Bole Sub-City</h3>
              <p className="text-[13px] text-[#1A1A1A]/70 font-medium leading-relaxed">
                {siteSettings.address}
              </p>
            </div>

            <div className="bento-card p-6 rounded-md shadow-2xs">
              <p className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-1 font-sans">Concierge</p>
              <h3 className="font-serif text-[20px] font-bold text-[#1A1A1A] mb-1">Call for Booking</h3>
              <p className="text-[13px] text-[#1A1A1A]/80 font-mono font-bold leading-relaxed">
                {siteSettings.phone}<br />
                <span className="font-sans text-[12px] text-[#1A1A1A]/60 font-medium">Daily concierge and mesob reservation assistance</span>
              </p>
            </div>

            <div className="bento-card p-6 rounded-md shadow-2xs">
              <p className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-1 font-sans">Operating Hours</p>
              <div className="flex justify-between items-center text-[13px] font-medium">
                <span className="text-[#1A1A1A]/70">Monday – Sunday</span>
                <span className="text-[#1A1A1A] font-bold">
                  {siteSettings.hoursType === '24hours' ? 'Open 24 Hours' : `${siteSettings.openTime} – ${siteSettings.closeTime}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Media Section */}
      <section id="gallery" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-[#1A1A1A]/10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#1A1A1A]/50 uppercase mb-3 font-sans">COMMUNITY & REVIEWS</p>
          <h2 className="font-serif italic text-[36px] sm:text-[48px] font-normal text-[#1A1A1A] leading-[1.05] mb-3">
            Captured on Google Maps
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium">
            Recent dining moments, kitfo presentations, and cultural coffee ceremonies shared by our patrons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaItems.map((media) => (
            <div 
              key={media.id}
              className="relative rounded-md overflow-hidden border border-[#1A1A1A]/10 bg-[#FFFFFF] aspect-[4/3] group shadow-2xs"
            >
              <img 
                src={media.imageUrl} 
                alt={media.title} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-[#FDFCF5]/90 backdrop-blur-xs border border-[#1A1A1A]/10 text-[#1A1A1A] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                📷 {media.type}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/60 to-transparent text-[#FDFCF5]">
                <p className="text-[13px] font-bold truncate">{media.title}</p>
                <p className="text-[11px] text-[#FDFCF5]/80 line-clamp-1 mt-0.5">{media.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://maps.google.com/?q=Totot+Traditional+Restaurant+Gerji+Addis+Ababa" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md border border-[#1A1A1A]/15 hover:bg-[#1A1A1A] hover:text-[#FDFCF5] text-[#1A1A1A] text-[11px] font-bold tracking-[0.2em] uppercase transition-all bg-[#FFFFFF] shadow-2xs"
          >
            <span>See All Photos & Reviews on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A]/10 py-12 px-6 md:px-12 bg-[#EFECE5]/60">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-serif italic text-[22px] font-normal text-[#1A1A1A]">
            Totot Cultural Restaurant
          </div>
          <p className="text-[12px] text-[#1A1A1A]/60 font-medium">
            © 2026 {siteSettings.brandName} — Gerji, Addis Ababa, Ethiopia.
          </p>
        </div>
      </footer>
    </div>
  );
};
