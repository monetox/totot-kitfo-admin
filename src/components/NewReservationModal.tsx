import React, { useState } from 'react';
import { Reservation } from '../types';
import { X, Star, Sparkles } from 'lucide-react';

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
}

export const NewReservationModal: React.FC<NewReservationModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [customerName, setCustomerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState('2026-08-25');
  const [time, setTime] = useState('19:30');
  const [isVIP, setIsVIP] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !contactPhone) return;

    onSubmit({
      customerName,
      contactPhone,
      partySize: Number(partySize),
      date,
      time,
      isVIP: isVIP || Number(partySize) >= 6,
      isCorporate,
      specialRequests
    });

    // Reset and close
    setCustomerName('');
    setContactPhone('');
    setPartySize(2);
    setSpecialRequests('');
    setIsVIP(false);
    setIsCorporate(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-lg overflow-hidden shadow-xl animate-fadeIn text-[#1A1A1A]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#EFECE5]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50">
                Totot Cultural Concierge
              </div>
              <h3 className="font-serif italic text-[20px] font-normal text-[#1A1A1A]">New Reservation Record</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1.5 rounded-md hover:bg-[#EFECE5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
              Patron Full Name
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Dr. Yohannes Berhane"
              className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
              Contact Phone
            </label>
            <input
              type="tel"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+251 91 123 4567 or +1 (555) 019-2834"
              className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
                Party Size
              </label>
              <input
                type="number"
                min="1"
                max="50"
                required
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bento-input w-full p-2.5 rounded-md text-[12px] text-[#1A1A1A] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
                Time
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bento-input w-full p-2.5 rounded-md text-[12px] text-[#1A1A1A] cursor-pointer"
              />
            </div>
          </div>

          {/* VIP & Corporate toggles */}
          <div className="flex items-center gap-6 py-2">
            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A] cursor-pointer">
              <input
                type="checkbox"
                checked={isVIP}
                onChange={(e) => setIsVIP(e.target.checked)}
                className="rounded border-[#1A1A1A]/30 text-[#1A1A1A] focus:ring-[#1A1A1A]"
              />
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#1A1A1A] fill-[#1A1A1A]" /> VIP Guest
              </span>
            </label>

            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A] cursor-pointer">
              <input
                type="checkbox"
                checked={isCorporate}
                onChange={(e) => setIsCorporate(e.target.checked)}
                className="rounded border-[#1A1A1A]/30 text-[#1A1A1A] focus:ring-[#1A1A1A]"
              />
              <span>Corporate Gathering</span>
            </label>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
              Special Culinary / Seating Requests
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Traditional mesob table, Jebena coffee ceremony setup, mild spice."
              rows={2}
              className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#1A1A1A]/10 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-[#1A1A1A]/15 rounded-md text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:bg-[#EFECE5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#1A1A1A] text-[#FDFCF5] font-bold tracking-[0.2em] uppercase rounded-md hover:bg-[#333333] text-[11px] transition-all shadow-2xs active:scale-95"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
