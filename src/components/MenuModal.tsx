import React, { useState, useEffect } from 'react';
import { MenuItem, CategoryType } from '../types';
import { X, Utensils, Sparkles } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<MenuItem>) => void;
  itemToEdit?: MenuItem | null;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onSave,
  itemToEdit
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>(1250);
  const [category, setCategory] = useState<CategoryType>('specialties');
  const [image, setImage] = useState('');
  const [available, setAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setPrice(itemToEdit.price);
      setCategory(itemToEdit.category);
      setImage(itemToEdit.image);
      setAvailable(itemToEdit.available);
      setIsFeatured(!!itemToEdit.isFeatured);
    } else {
      setName('');
      setDescription('');
      setPrice(750);
      setCategory('specialties');
      setImage('https://lh3.googleusercontent.com/aida-public/AB6AXuBvv2p3Y0bwHcgqLT29PHl6660A-ekamYuu2BhMraCWfRn0gk84eRluhNCgT_ZE0Vxt8jBk0BRjzhrxD4bUI7rZoEhEcOOAAEbZau7yOFoNuVQP5A0BjMCKiFaNqcFyKk6qGoVrPAww_T-BUn95kQg963bqsW4r_XnB7Zek2EpHKpnBz7h49CbGR2r4kmWmfxJAZVVU0rzM_T9xr2bYR5cwt15eJt095jhP4vlL3pfsmdlytix0Lt1bUw');
      setAvailable(true);
      setIsFeatured(false);
    }
  }, [itemToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onSave({
      name,
      description,
      price: Number(price),
      category,
      image: image || 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
      available,
      isFeatured
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-lg overflow-hidden shadow-xl animate-fadeIn text-[#1A1A1A]">
        <div className="px-6 py-5 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#EFECE5]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#1A1A1A] text-[#FDFCF5] flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50">
                Culinary Catalogue CMS
              </div>
              <h3 className="font-serif italic text-[20px] font-normal text-[#1A1A1A]">
                {itemToEdit ? 'Edit Dish Offering' : 'Add New Culinary Offering'}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1.5 rounded-md hover:bg-[#EFECE5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
              Dish Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Totot Special Kitfo"
              className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
              Gastronomic Description & Spices
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Premium minced beef, seasoned butter, mitmita, served with ayib..."
              className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
                Price (ETB)
              </label>
              <input
                type="number"
                step="10"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A] font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
              >
                <option value="specialties">Specialties</option>
                <option value="sides">Sides</option>
                <option value="drinks">Drinks & Coffee</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">
              Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://... photo url"
              className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-[#1A1A1A]/10 pt-3">
            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A] cursor-pointer">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="rounded border-[#1A1A1A]/30 text-[#1A1A1A] focus:ring-[#1A1A1A]"
              />
              <span>Available on Menu</span>
            </label>

            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#1A1A1A] cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded border-[#1A1A1A]/30 text-[#1A1A1A] focus:ring-[#1A1A1A]"
              />
              <span className="flex items-center gap-1 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" /> Featured Spotlight
              </span>
            </label>
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
              {itemToEdit ? 'Save Changes' : 'Create Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
