import React, { useState } from 'react';
import { MenuItem, CategoryType } from '../types';
import { 
  Download, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  Search, 
  Sparkles
} from 'lucide-react';

interface MenuCMSViewProps {
  menuItems: MenuItem[];
  onToggleAvailability: (id: string) => void;
  onAddNewItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
  onExportJSON: () => void;
}

export const MenuCMSView: React.FC<MenuCMSViewProps> = ({
  menuItems,
  onToggleAvailability,
  onAddNewItem,
  onEditItem,
  onDeleteItem,
  onExportJSON
}) => {
  const [activeTab, setActiveTab] = useState<CategoryType>('specialties');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryCounts = {
    specialties: menuItems.filter(m => m.category === 'specialties').length,
    sides: menuItems.filter(m => m.category === 'sides').length,
    drinks: menuItems.filter(m => m.category === 'drinks').length
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1A1A1A]/10 gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-[#1A1A1A]/50 font-sans">
            Selection 03 / Culinary Portfolio
          </div>
          <h2 className="font-serif italic text-[32px] md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[0.95]">
            Gastronomic Catalog
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium max-w-xl mt-2">
            Curate signature offerings, market pricing, and live kitchen availability.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button 
            id="btn-export-menu-json"
            onClick={onExportJSON}
            className="px-4 py-2.5 border border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#EFECE5] text-[11px] font-bold tracking-[0.15em] uppercase rounded-md transition-all flex items-center gap-2 bg-[#FFFFFF] shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#1A1A1A]/70" />
            <span>Export Catalog</span>
          </button>

          <button 
            id="btn-add-menu-item"
            onClick={onAddNewItem}
            className="px-5 py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] text-[11px] font-bold tracking-[0.2em] uppercase rounded-md transition-colors flex items-center gap-2 shadow-2xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Offering</span>
          </button>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1A1A1A]/10 mb-6 gap-4 pb-2">
        <div className="flex gap-2 overflow-x-auto">
          <button 
            id="tab-specialties"
            onClick={() => setActiveTab('specialties')}
            className={`px-5 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase rounded-t-md transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'specialties'
                ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A] bg-[#EFECE5]/80'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EFECE5]/40'
            }`}
          >
            <span>Signature Specialties</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === 'specialties' ? 'bg-[#1A1A1A] text-[#FDFCF5]' : 'bg-[#EFECE5] text-[#1A1A1A]/70'}`}>
              {categoryCounts.specialties}
            </span>
          </button>

          <button 
            id="tab-sides"
            onClick={() => setActiveTab('sides')}
            className={`px-5 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase rounded-t-md transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'sides'
                ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A] bg-[#EFECE5]/80'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EFECE5]/40'
            }`}
          >
            <span>Side Complements</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === 'sides' ? 'bg-[#1A1A1A] text-[#FDFCF5]' : 'bg-[#EFECE5] text-[#1A1A1A]/70'}`}>
              {categoryCounts.sides}
            </span>
          </button>

          <button 
            id="tab-drinks"
            onClick={() => setActiveTab('drinks')}
            className={`px-5 py-2.5 text-[11px] font-bold tracking-[0.15em] uppercase rounded-t-md transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'drinks'
                ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A] bg-[#EFECE5]/80'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EFECE5]/40'
            }`}
          >
            <span>Beverages & Tej</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeTab === 'drinks' ? 'bg-[#1A1A1A] text-[#FDFCF5]' : 'bg-[#EFECE5] text-[#1A1A1A]/70'}`}>
              {categoryCounts.drinks}
            </span>
          </button>
        </div>

        {/* Search in Tab */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#1A1A1A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFFFFF] border border-[#1A1A1A]/15 rounded-md pl-9 pr-3 py-1.5 text-[12px] text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none placeholder:text-[#1A1A1A]/40 shadow-2xs"
          />
        </div>
      </div>

      {/* Bento Container Table */}
      <div className="bento-card rounded-md overflow-hidden shadow-2xs">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#1A1A1A]/10 bg-[#EFECE5]/60 text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em] font-sans">
          <div className="col-span-1 hidden md:flex items-center justify-center">
            <span>Visual</span>
          </div>
          <div className="col-span-6 md:col-span-5 flex items-center">
            <span>Dish & Description</span>
          </div>
          <div className="col-span-3 md:col-span-2 flex items-center">
            <span>Pricing (ETB)</span>
          </div>
          <div className="col-span-3 md:col-span-2 flex items-center justify-center">
            <span>Availability</span>
          </div>
          <div className="col-span-12 md:col-span-2 flex items-center justify-end md:justify-center mt-2 md:mt-0">
            <span>Actions</span>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#1A1A1A]/8" id="menuList">
          {filteredItems.length === 0 ? (
            <div className="py-16 text-center text-[#1A1A1A]/50">
              <p className="text-[16px] font-serif italic">No menu items found in this category.</p>
              <button 
                onClick={onAddNewItem} 
                className="mt-3 text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A] hover:underline"
              >
                + Add your first item
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item.id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-[#F7F5EE] transition-colors items-center group"
              >
                {/* Image */}
                <div className="col-span-1 hidden md:flex justify-center">
                  <div className="w-11 h-11 rounded-md border border-[#1A1A1A]/15 overflow-hidden bg-[#EFECE5] flex items-center justify-center shrink-0 shadow-2xs">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-[#1A1A1A]/40" />
                    )}
                  </div>
                </div>

                {/* Item Name & Details */}
                <div className="col-span-6 md:col-span-5">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-bold text-[#1A1A1A] group-hover:underline transition-colors">
                      {item.name}
                    </p>
                    {item.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#FDFCF5] text-[9px] font-bold uppercase tracking-wider flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#1A1A1A]/70 mt-0.5 line-clamp-1 font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Price (ETB) */}
                <div className="col-span-3 md:col-span-2">
                  <p className="text-[13px] font-bold text-[#1A1A1A] font-mono">
                    ETB {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>

                {/* Status Toggle Switch */}
                <div className="col-span-3 md:col-span-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => onToggleAvailability(item.id)}
                    className={`
                      relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border border-transparent 
                      transition-colors duration-200 ease-in-out focus:outline-none
                      ${item.available ? 'bg-[#1A1A1A]' : 'bg-[#EFECE5] border-[#1A1A1A]/20'}
                    `}
                    role="switch"
                    aria-checked={item.available}
                    title={item.available ? 'Mark as Unavailable' : 'Mark as Available'}
                  >
                    <span
                      aria-hidden="true"
                      className={`
                        pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#FFFFFF] shadow-2xs ring-0 
                        transition duration-200 ease-in-out border border-[#1A1A1A]/10 mt-0.5
                        ${item.available ? 'translate-x-5' : 'translate-x-0.5'}
                      `}
                    />
                  </button>
                </div>

                {/* Actions */}
                <div className="col-span-12 md:col-span-2 flex justify-end md:justify-center gap-1 mt-2 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEditItem(item)}
                    className="p-1.5 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#EFECE5] rounded-md transition-all"
                    title="Edit Item"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 text-[#1A1A1A]/70 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-all"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
