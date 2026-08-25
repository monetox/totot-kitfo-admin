import React, { useState } from 'react';
import { MenuItem } from '../types';
import { X, Sparkles, Check } from 'lucide-react';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onSelectFeaturedDish: (dishId: string, customPromoText?: string) => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onSelectFeaturedDish
}) => {
  const currentFeatured = menuItems.find(m => m.isFeatured) || menuItems[0];
  const [selectedId, setSelectedId] = useState(currentFeatured?.id || '');
  const [promoHeadline, setPromoHeadline] = useState('Special Kitfo Reserve');
  const [promoNote, setPromoNote] = useState("Highlighting tonight's premium offering to active guests.");

  if (!isOpen) return null;

  const handleSave = () => {
    onSelectFeaturedDish(selectedId, `${promoHeadline} - ${promoNote}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-lg overflow-hidden shadow-xl animate-fadeIn text-[#1A1A1A]">
        <div className="px-6 py-5 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#EFECE5]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50">
                Front-of-House Curator
              </div>
              <h3 className="font-serif italic text-[20px] font-normal text-[#1A1A1A]">Culinary Spotlight & Promo</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1.5 rounded-md hover:bg-[#EFECE5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2">
              Select Featured Dish
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {menuItems.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`p-3 rounded-md border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#1A1A1A] bg-[#FFFFFF] shadow-2xs'
                        : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 bg-[#FAF8F0]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-10 h-10 rounded-md object-cover border border-[#1A1A1A]/10" 
                      />
                      <div>
                        <p className="text-[13px] font-bold text-[#1A1A1A]">{item.name}</p>
                        <p className="text-[11px] text-[#1A1A1A]/60 font-mono">{item.price} ETB</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
              Spotlight Banner Title
            </label>
            <input
              type="text"
              value={promoHeadline}
              onChange={(e) => setPromoHeadline(e.target.value)}
              className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
              Culinary Note / Subtitle
            </label>
            <input
              type="text"
              value={promoNote}
              onChange={(e) => setPromoNote(e.target.value)}
              className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#1A1A1A]/10 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-[#1A1A1A]/15 rounded-md text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:bg-[#EFECE5]"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#1A1A1A] text-[#FDFCF5] font-bold tracking-[0.2em] uppercase rounded-md hover:bg-[#333333] text-[11px] shadow-2xs transition-all active:scale-95"
            >
              Update Spotlight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
