import React, { useState } from 'react';
import { MediaItem } from '../types';
import { 
  Plus, 
  Star, 
  Trash2, 
  Heart, 
  Camera,
  X
} from 'lucide-react';

interface BentoMediaViewProps {
  mediaItems: MediaItem[];
  onToggleFeatured: (id: string) => void;
  onAddMedia: (newItem: Omit<MediaItem, 'id' | 'likes'>) => void;
  onDeleteMedia: (id: string) => void;
}

export const BentoMediaView: React.FC<BentoMediaViewProps> = ({
  mediaItems,
  onToggleFeatured,
  onAddMedia,
  onDeleteMedia
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newType, setNewType] = useState<'photo' | 'video' | 'highlight'>('photo');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    onAddMedia({
      title: newTitle,
      imageUrl: newImageUrl,
      caption: newCaption,
      author: newAuthor || 'Patron Review via Google Maps',
      date: 'Just now',
      type: newType,
      featuredOnBento: true
    });

    setNewTitle('');
    setNewImageUrl('');
    setNewCaption('');
    setNewAuthor('');
    setShowAddModal(false);
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1A1A1A]/10 gap-4">
        <div>
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-[#1A1A1A]/50 font-sans">
            Selection 04 / Visual Gallery
          </div>
          <h2 className="font-serif italic text-[32px] md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[0.95]">
            Curated Visuals & Moments
          </h2>
          <p className="text-[14px] text-[#1A1A1A]/70 font-medium max-w-xl mt-2">
            Curate visual moments, patron captures, and live highlights featured across the public presentation.
          </p>
        </div>

        <button 
          id="btn-add-media"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] text-[11px] font-bold tracking-[0.2em] uppercase rounded-md transition-colors flex items-center gap-2 shadow-2xs active:scale-95"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map((item) => (
          <div 
            key={item.id}
            className="bento-card rounded-md overflow-hidden group flex flex-col justify-between shadow-2xs"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#EFECE5]">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-black/30" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-[9px] font-bold tracking-wider text-[#1A1A1A] border border-[#1A1A1A]/10 flex items-center gap-1 uppercase">
                  <Camera className="w-3 h-3 text-[#1A1A1A]" />
                  {item.type}
                </span>
                {item.featuredOnBento && (
                  <span className="px-2.5 py-1 rounded-full bg-[#1A1A1A] text-[#FDFCF5] text-[9px] font-bold tracking-wider uppercase shadow-2xs">
                    Featured Pick
                  </span>
                )}
              </div>

              {/* Likes counter */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md text-[10px] font-bold text-rose-700 border border-[#1A1A1A]/10 flex items-center gap-1">
                <Heart className="w-3 h-3 fill-rose-600 text-rose-600" /> {item.likes}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-[18px] font-bold text-[#1A1A1A] group-hover:underline transition-colors mb-1.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#1A1A1A]/70 line-clamp-2 mb-3 font-medium">
                  {item.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] font-medium text-[#1A1A1A]/50 pt-2 border-t border-[#1A1A1A]/8">
                  <span>{item.author}</span>
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="border-t border-[#1A1A1A]/10 pt-4 mt-4 flex items-center justify-between">
                <button
                  onClick={() => onToggleFeatured(item.id)}
                  className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 ${
                    item.featuredOnBento 
                      ? 'border-[#1A1A1A] text-[#1A1A1A] bg-[#EFECE5]' 
                      : 'border-[#1A1A1A]/20 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/50 bg-white'
                  }`}
                >
                  <Star className={`w-3 h-3 ${item.featuredOnBento ? 'fill-[#1A1A1A]' : ''}`} />
                  <span>{item.featuredOnBento ? 'Featured on Bento' : 'Set as Featured'}</span>
                </button>

                <button
                  onClick={() => onDeleteMedia(item.id)}
                  className="p-1.5 text-[#1A1A1A]/60 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                  title="Delete media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bento-card rounded-md w-full max-w-lg p-6 md:p-8 animate-fadeIn shadow-xl border border-[#1A1A1A]/20">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-serif italic text-[24px] font-normal text-[#1A1A1A]">Add Media Asset</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 text-[#1A1A1A]/50 hover:text-[#1A1A1A] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[13px] text-[#1A1A1A]/70 mb-6">Link a photo from Google Maps or culinary studio.</p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">Asset Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Traditional Dining Atmosphere"
                  className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">Image URL</label>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://... image link"
                  className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">Caption & Description</label>
                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Short description of the photo or dish..."
                  rows={2}
                  className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">Author / Credit</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Patron via Google Maps"
                    className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-1.5">Media Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="bento-input w-full p-2.5 rounded-md text-[13px] text-[#1A1A1A]"
                  >
                    <option value="photo">Photo</option>
                    <option value="highlight">Highlight</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1A1A1A]/10 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#1A1A1A]/15 rounded-md text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A]/70 hover:bg-[#EFECE5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1A1A1A] text-[#FDFCF5] font-bold text-[11px] tracking-wider uppercase rounded-md hover:bg-[#333333] shadow-2xs"
                >
                  Add Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
