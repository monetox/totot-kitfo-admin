import React from 'react';
import { Reservation, ReservationStatus } from '../types';
import { X, Star, Users, Clock, Trash2 } from 'lucide-react';

interface ReservationDetailsModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ReservationStatus) => void;
  onDelete: (id: string) => void;
}

export const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  reservation,
  isOpen,
  onClose,
  onUpdateStatus,
  onDelete
}) => {
  if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-md overflow-hidden shadow-xl animate-fadeIn text-[#1A1A1A]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#EFECE5]/60">
          <div className="flex items-center gap-2">
            <h3 className="font-serif italic text-[20px] font-normal text-[#1A1A1A]">Reservation Record</h3>
            {reservation.isVIP && (
              <span className="px-2 py-0.5 rounded bg-[#1A1A1A] text-[#FDFCF5] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-[#FDFCF5]" /> VIP
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1.5 rounded-md hover:bg-[#EFECE5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#1A1A1A]/10">
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center text-[16px] font-serif font-bold">
              {reservation.customerName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-[16px] font-bold text-[#1A1A1A]">{reservation.customerName}</p>
              <p className="text-[13px] text-[#1A1A1A]/70 font-mono">{reservation.contactPhone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="bg-[#FFFFFF] p-3 rounded-md border border-[#1A1A1A]/10 shadow-2xs">
              <p className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Users className="w-3 h-3 text-[#1A1A1A]/70" /> Party Size
              </p>
              <p className="text-[15px] font-bold text-[#1A1A1A]">{reservation.partySize} Guests</p>
            </div>

            <div className="bg-[#FFFFFF] p-3 rounded-md border border-[#1A1A1A]/10 shadow-2xs">
              <p className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#1A1A1A]/70" /> Schedule
              </p>
              <p className="text-[13px] font-bold text-[#1A1A1A]">{reservation.date}</p>
              <p className="text-[12px] text-[#1A1A1A]/70 font-mono">{reservation.time}</p>
            </div>
          </div>

          {reservation.specialRequests && (
            <div className="bg-[#FFFFFF] p-3.5 rounded-md border border-[#1A1A1A]/10 shadow-2xs">
              <p className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1">
                Special Requests / Seating
              </p>
              <p className="text-[13px] text-[#1A1A1A]/80 italic">
                "{reservation.specialRequests}"
              </p>
            </div>
          )}

          {/* Status buttons */}
          <div className="pt-2">
            <p className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-2">
              Update Status
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onUpdateStatus(reservation.id, 'Confirmed');
                  onClose();
                }}
                className={`py-2 px-3 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  reservation.status === 'Confirmed'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:bg-[#EFECE5]'
                }`}
              >
                ✓ Confirmed
              </button>

              <button
                onClick={() => {
                  onUpdateStatus(reservation.id, 'Pending');
                  onClose();
                }}
                className={`py-2 px-3 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  reservation.status === 'Pending'
                    ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-2xs'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:bg-[#EFECE5]'
                }`}
              >
                ⏳ Pending
              </button>

              <button
                onClick={() => {
                  onUpdateStatus(reservation.id, 'Completed');
                  onClose();
                }}
                className={`py-2 px-3 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  reservation.status === 'Completed'
                    ? 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A] shadow-2xs'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:bg-[#EFECE5]'
                }`}
              >
                🏁 Completed
              </button>

              <button
                onClick={() => {
                  onUpdateStatus(reservation.id, 'Cancelled');
                  onClose();
                }}
                className={`py-2 px-3 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all border ${
                  reservation.status === 'Cancelled'
                    ? 'bg-red-50 text-red-800 border-red-300 shadow-2xs'
                    : 'border-[#1A1A1A]/10 text-[#1A1A1A]/70 hover:bg-[#EFECE5]'
                }`}
              >
                ✕ Cancelled
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#1A1A1A]/10">
            <button
              onClick={() => {
                onDelete(reservation.id);
                onClose();
              }}
              className="text-[11px] font-bold uppercase tracking-wider text-red-700 hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove Booking
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCF5] rounded-md text-[11px] font-bold uppercase tracking-wider shadow-2xs"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
