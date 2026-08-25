import React, { useState } from 'react';
import { Reservation, ReservationStatus } from '../types';
import { 
  Search, 
  Calendar as CalendarIcon, 
  Filter, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Star, 
  Building2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2
} from 'lucide-react';

interface ReservationsViewProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: ReservationStatus) => void;
  onDeleteReservation: (id: string) => void;
  onOpenNewReservation: () => void;
  onOpenReservationDetails: (res: Reservation) => void;
}

export const ReservationsView: React.FC<ReservationsViewProps> = ({
  reservations,
  onUpdateStatus,
  onDeleteReservation,
  onOpenNewReservation,
  onOpenReservationDetails
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [onlyVIP, setOnlyVIP] = useState(false);

  const itemsPerPage = 6;

  // Filter reservations
  const filtered = reservations.filter(res => {
    const matchesSearch = res.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.contactPhone.includes(searchQuery);
    const matchesDate = !dateFilter || res.date === dateFilter;
    
    let matchesSize = true;
    if (sizeFilter === '1-2') matchesSize = res.partySize >= 1 && res.partySize <= 2;
    else if (sizeFilter === '3-4') matchesSize = res.partySize >= 3 && res.partySize <= 4;
    else if (sizeFilter === '5+') matchesSize = res.partySize >= 5;

    const matchesStatus = statusFilter === 'all' || res.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesVIP = !onlyVIP || res.isVIP;

    return matchesSearch && matchesDate && matchesSize && matchesStatus && matchesVIP;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status: ReservationStatus) => {
    switch (status) {
      case 'Pending':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending</span>
          </div>
        );
      case 'Confirmed':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EFECE5] border border-[#1A1A1A]/15 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Confirmed</span>
          </div>
        );
      case 'Cancelled':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5F3EB] border border-[#1A1A1A]/10 opacity-70">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/60">Cancelled</span>
          </div>
        );
      case 'Completed':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1A1A] text-[#FDFCF5]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Completed</span>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1A1A1A]/10 gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-[#1A1A1A]/50 font-sans">
            Selection 02 / Guest Manifest
          </div>
          <h2 className="font-serif italic text-[32px] md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[0.95]">
            Booking Ledger
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium max-w-xl mt-2">
            Oversee incoming reservations, manage party capacities, and maintain real-time dining room seating.
          </p>
        </div>

        <button 
          id="btn-add-booking"
          onClick={onOpenNewReservation}
          className="px-5 py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] text-[11px] font-bold tracking-[0.2em] uppercase rounded-md transition-all flex items-center gap-2 shadow-2xs self-start md:self-auto active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Reservation</span>
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Filters & Search Card */}
        <div className="col-span-12 bento-card p-5 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 w-full md:w-auto flex-1">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 w-4 h-4" />
              <input
                id="input-reservation-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or phone..."
                className="bento-input w-full rounded-md py-2 pl-10 pr-4 text-[12px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/40"
              />
            </div>

            {/* Date Filter */}
            <div className="relative min-w-[180px]">
              <CalendarIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 w-4 h-4 pointer-events-none" />
              <input
                id="input-reservation-date"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bento-input w-full rounded-md py-2 pl-10 pr-3 text-[12px] text-[#1A1A1A] cursor-pointer"
              />
            </div>

            {/* Party Size Filter */}
            <div className="relative min-w-[140px]">
              <select
                id="select-reservation-size"
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="bento-input w-full rounded-md py-2 pl-4 pr-8 text-[12px] text-[#1A1A1A] appearance-none cursor-pointer"
              >
                <option value="">All Sizes</option>
                <option value="1-2">1-2 Guests</option>
                <option value="3-4">3-4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 text-[10px]">
                ▼
              </div>
            </div>

            {/* Status Pills Quick Tabs */}
            <div className="hidden lg:flex items-center bg-[#EFECE5] p-1 rounded-md border border-[#1A1A1A]/10">
              {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                    statusFilter === st 
                      ? 'bg-[#1A1A1A] text-[#FDFCF5] shadow-2xs' 
                      : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {dateFilter && (
              <button 
                onClick={() => setDateFilter('')}
                className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] hover:underline px-2"
              >
                Clear Date
              </button>
            )}

            <button 
              id="btn-more-filters"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className={`bg-transparent border text-[11px] font-bold tracking-wider uppercase py-2 px-3.5 rounded-md transition-all flex items-center gap-2 ${
                onlyVIP || showMoreFilters
                  ? 'border-[#1A1A1A] text-[#1A1A1A] bg-[#EFECE5]'
                  : 'border-[#1A1A1A]/15 text-[#1A1A1A]/70 hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* More Filters Panel (Expandable) */}
        {showMoreFilters && (
          <div className="col-span-12 bento-card p-4 bg-[#EFECE5] flex flex-wrap items-center gap-6 animate-fadeIn">
            <label className="flex items-center gap-2 text-[12px] font-medium text-[#1A1A1A] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyVIP}
                onChange={(e) => setOnlyVIP(e.target.checked)}
                className="rounded border-[#1A1A1A]/20 text-[#1A1A1A] focus:ring-[#1A1A1A]"
              />
              <span className="flex items-center gap-1 font-bold">
                <Star className="w-3.5 h-3.5 text-[#1A1A1A] fill-[#1A1A1A]" /> VIP Patrons Only
              </span>
            </label>

            <div className="flex items-center gap-2 text-[12px] text-[#1A1A1A]/70">
              <span className="font-bold uppercase text-[10px] tracking-wider">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bento-input py-1 px-3 rounded text-[11px] text-[#1A1A1A]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button 
              onClick={() => {
                setSearchQuery('');
                setDateFilter('');
                setSizeFilter('');
                setStatusFilter('all');
                setOnlyVIP(false);
              }}
              className="text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A]/60 hover:text-[#1A1A1A] ml-auto hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Data Table Card */}
        <div className="col-span-12 bento-card rounded-md overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#1A1A1A]/10 bg-[#EFECE5]/60 text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em] font-sans">
                  <th className="py-3.5 px-6 w-1/4">Patron Name</th>
                  <th className="py-3.5 px-6">Telephone</th>
                  <th className="py-3.5 px-6 text-center">Party</th>
                  <th className="py-3.5 px-6">Schedule</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/8 font-sans">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-[#1A1A1A]/50">
                      <p className="font-serif italic text-[18px]">No reservations match your filter criteria.</p>
                      <button 
                        onClick={onOpenNewReservation}
                        className="mt-3 text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A] hover:underline"
                      >
                        + Create a new reservation
                      </button>
                    </td>
                  </tr>
                ) : (
                  paginated.map((res) => {
                    const isCancelled = res.status === 'Cancelled';
                    return (
                      <tr 
                        key={res.id}
                        className={`group hover:bg-[#F7F5EE] transition-colors ${isCancelled ? 'opacity-50' : ''}`}
                      >
                        {/* Customer */}
                        <td className="py-3.5 px-6 cursor-pointer" onClick={() => onOpenReservationDetails(res)}>
                          <p className={`text-[13px] font-bold text-[#1A1A1A] group-hover:underline transition-all ${
                            isCancelled ? 'line-through decoration-[#1A1A1A]/30' : ''
                          }`}>
                            {res.customerName}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {res.isVIP && (
                              <span className="text-[9px] font-bold tracking-wider uppercase text-[#1A1A1A] flex items-center gap-0.5">
                                <Star className="w-2.5 h-2.5 fill-[#1A1A1A]" /> VIP
                              </span>
                            )}
                            {res.isCorporate && (
                              <span className="text-[9px] font-bold tracking-wider uppercase text-[#1A1A1A]/60 flex items-center gap-0.5">
                                <Building2 className="w-2.5 h-2.5" /> Corporate
                              </span>
                            )}
                            {!res.isVIP && !res.isCorporate && (
                              <span className="text-[10px] text-[#1A1A1A]/40 font-medium">Standard Seating</span>
                            )}
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3.5 px-6">
                          <p className="text-[12px] text-[#1A1A1A]/80 font-mono">{res.contactPhone}</p>
                        </td>

                        {/* Guests count */}
                        <td className="py-3.5 px-6 text-center">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#EFECE5] text-[#1A1A1A] text-[11px] font-bold border border-[#1A1A1A]/15">
                            {res.partySize}
                          </span>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-6">
                          <p className="text-[13px] text-[#1A1A1A] font-bold">{res.date}</p>
                          <p className="text-[11px] text-[#1A1A1A]/60 font-mono">{res.time}</p>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-6">
                          {getStatusBadge(res.status)}
                        </td>

                        {/* Actions Menu */}
                        <td className="py-3.5 px-6 text-right relative">
                          <div className="inline-block text-left">
                            <button 
                              onClick={() => setActiveMenuId(activeMenuId === res.id ? null : res.id)}
                              className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1.5 rounded-md hover:bg-[#EFECE5] transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {activeMenuId === res.id && (
                              <div className="absolute right-6 top-10 w-44 bg-[#FFFFFF] border border-[#1A1A1A]/15 rounded-md shadow-xl py-1.5 z-30 animate-fadeIn text-left">
                                <p className="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/40 border-b border-[#1A1A1A]/10">
                                  Update Status
                                </p>
                                <button
                                  onClick={() => {
                                    onUpdateStatus(res.id, 'Confirmed');
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-[11px] font-medium text-emerald-800 hover:bg-[#F7F5EE] flex items-center gap-2"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" /> Mark Confirmed
                                </button>
                                <button
                                  onClick={() => {
                                    onUpdateStatus(res.id, 'Pending');
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-[11px] font-medium text-amber-800 hover:bg-[#F7F5EE] flex items-center gap-2"
                                >
                                  <Clock className="w-3.5 h-3.5" /> Mark Pending
                                </button>
                                <button
                                  onClick={() => {
                                    onUpdateStatus(res.id, 'Completed');
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-[11px] font-medium text-[#1A1A1A] hover:bg-[#F7F5EE] flex items-center gap-2"
                                >
                                  <CheckCircle className="w-3.5 h-3.5" /> Mark Completed
                                </button>
                                <button
                                  onClick={() => {
                                    onUpdateStatus(res.id, 'Cancelled');
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-[11px] font-medium text-rose-700 hover:bg-[#F7F5EE] flex items-center gap-2"
                                >
                                  <XCircle className="w-3.5 h-3.5" /> Mark Cancelled
                                </button>

                                <div className="border-t border-[#1A1A1A]/10 my-1" />

                                <button
                                  onClick={() => {
                                    onDeleteReservation(res.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full text-left px-3 py-1.5 text-[11px] font-medium text-rose-700 hover:bg-rose-50 flex items-center gap-2"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete Entry
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="border-t border-[#1A1A1A]/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#EFECE5]/30">
            <p className="text-[11px] font-medium text-[#1A1A1A]/60">
              Showing {filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
            </p>

            <div className="flex gap-1.5">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-7 h-7 rounded flex items-center justify-center border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#EFECE5] transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded flex items-center justify-center text-[11px] font-bold transition-colors ${
                    currentPage === pageNum
                      ? 'bg-[#1A1A1A] text-[#FDFCF5]'
                      : 'border border-[#1A1A1A]/15 text-[#1A1A1A]/70 hover:bg-[#EFECE5]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-7 h-7 rounded flex items-center justify-center border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#EFECE5] transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
