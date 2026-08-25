import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Users
} from 'lucide-react';
import { Reservation, MenuItem, SiteSettings } from '../types';

interface ReportsViewProps {
  reservations: Reservation[];
  menuItems: MenuItem[];
  siteSettings: SiteSettings;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  reservations
}) => {
  const [reportDate] = useState('2026-08-25');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExportCSV = () => {
    const headers = "ID,Customer Name,Phone,Party Size,Date,Time,Status,VIP\n";
    const rows = reservations.map(r => 
      `"${r.id}","${r.customerName}","${r.contactPhone}",${r.partySize},"${r.date}","${r.time}","${r.status}",${r.isVIP}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `totot_reservations_report_${reportDate}.csv`;
    a.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1A1A1A]/10 gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-[#1A1A1A]/50 font-sans">
            Selection 06 / Kitchen Manifest
          </div>
          <h2 className="font-serif italic text-[32px] md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[0.95]">
            Operations & Daily Roster
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium max-w-xl mt-2">
            Export booking manifests, kitchen prep rosters, and live shift summaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportCSV}
            className="px-5 py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] text-[11px] font-bold tracking-[0.2em] uppercase rounded-md transition-all flex items-center gap-2 shadow-2xs active:scale-95"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export Manifest (CSV)</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="mb-6 p-3 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 text-[12px] font-medium flex items-center gap-2 animate-fadeIn shadow-2xs">
          <CheckCircle2 className="w-4 h-4" /> Manifest roster successfully generated and downloaded!
        </div>
      )}

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bento-card p-6 rounded-md shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-[#1A1A1A]/60">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Kitchen Kitfo Prep</span>
            <FileText className="w-4 h-4 text-[#1A1A1A]/60" />
          </div>
          <p className="font-serif text-[32px] font-normal text-[#1A1A1A] leading-none mb-1">38.5 kg</p>
          <p className="text-[12px] text-[#1A1A1A]/60 font-medium mt-1">Est. prime tenderloin required for tonight</p>
        </div>

        <div className="bento-card p-6 rounded-md shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-[#1A1A1A]/60">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">VIP Tables Allocated</span>
            <Users className="w-4 h-4 text-[#1A1A1A]/60" />
          </div>
          <p className="font-serif text-[32px] font-normal text-[#1A1A1A] leading-none mb-1">
            {reservations.filter(r => r.isVIP).length} VIP Parties
          </p>
          <p className="text-[12px] text-[#1A1A1A]/60 font-medium mt-1">Dedicated mesob stations primed</p>
        </div>

        <div className="bento-card p-6 rounded-md shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-[#1A1A1A]/60">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Service Shift Status</span>
            <Clock className="w-4 h-4 text-[#1A1A1A]/60" />
          </div>
          <p className="font-serif text-[32px] font-normal text-emerald-800 leading-none mb-1">Active (Dinner)</p>
          <p className="text-[12px] text-[#1A1A1A]/60 font-medium mt-1">12 floor staff & 6 culinary artisans</p>
        </div>
      </div>

      {/* Manifest Table */}
      <div className="bento-card rounded-md overflow-hidden p-6 shadow-2xs">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1 text-[#1A1A1A]/50 font-sans">
          Live Guest Registry
        </div>
        <h3 className="font-serif italic text-[22px] font-normal text-[#1A1A1A] mb-4">
          Daily Table Manifest
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#1A1A1A]">
            <thead>
              <tr className="border-b border-[#1A1A1A]/10 bg-[#EFECE5]/60 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-sans">
                <th className="py-3 px-4">Seating Time</th>
                <th className="py-3 px-4">Patron Name</th>
                <th className="py-3 px-4">Party Size</th>
                <th className="py-3 px-4">Contact Phone</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/8">
              {reservations.map((r) => (
                <tr key={r.id} className="hover:bg-[#F7F5EE] transition-colors">
                  <td className="py-3 px-4 font-mono text-[12px] font-bold text-[#1A1A1A]">{r.time}</td>
                  <td className="py-3 px-4 font-bold text-[#1A1A1A]">
                    {r.customerName} {r.isVIP && <span className="ml-1 px-1.5 py-0.5 rounded bg-[#1A1A1A] text-[#FDFCF5] text-[9px] uppercase tracking-wider font-sans font-bold">VIP</span>}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#1A1A1A]/80">{r.partySize} Guests</td>
                  <td className="py-3 px-4 font-mono text-[12px] text-[#1A1A1A]/70">{r.contactPhone}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#EFECE5] text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
