import React, { useState } from 'react';
import { useApp } from './AppContext';
import { GalleryPhoto } from './types';
import { Maximize2, X, ChevronRight, ChevronLeft } from 'lucide-react';

export const FoodGallery: React.FC = () => {
  const { language, galleryPhotos, lightboxPhoto, setLightboxPhoto } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const isAr = language === 'ar';

  const filterCategories = [
    { id: 'all', nameAr: 'كل الصور', nameEn: 'All Photos' },
    { id: 'shawarma', nameAr: 'شاورما وسندوتشات', nameEn: 'Shawarma' },
    { id: 'boxes', nameAr: 'بوكسات وتغليف', nameEn: 'Boxes & Packaging' },
    { id: 'platters', nameAr: 'أطباق ووجبات', nameEn: 'Platters' },
    { id: 'grilled', nameAr: 'مشويات وكريسبي', nameEn: 'Grilled & Crispy' },
  ];

  const filteredPhotos = galleryPhotos.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'shawarma') return p.categoryAr.includes('شاورما');
    if (activeFilter === 'boxes') return p.categoryAr.includes('بوكس');
    if (activeFilter === 'platters') return p.categoryAr.includes('أطباق');
    if (activeFilter === 'grilled')
      return p.categoryAr.includes('مشوي') || p.categoryAr.includes('كريسبي');
    return true;
  });

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxPhoto) return;
    const currentIndex = galleryPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % galleryPhotos.length;
    setLightboxPhoto(galleryPhotos[nextIndex]);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxPhoto) return;
    const currentIndex = galleryPhotos.findIndex((p) => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    setLightboxPhoto(galleryPhotos[prevIndex]);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-stone-950 via-emerald-950/70 to-stone-950 border-b border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <span>{isAr ? 'من داخل المطعم' : 'From Our Kitchen'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">{isAr ? 'تصوير حقيقي' : 'Authentic Photos'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {isAr ? 'معرض صور وجبات شاورمر' : 'Shawarmer Food Gallery'}
          </h2>
          <p className="text-sm md:text-base text-emerald-100/80 mt-2">
            {isAr
              ? 'صور حقيقية مباشرة لأطباقنا، التغليف الأخضر المميز، والدجاج المشوي على السيخ في السنطة.'
              : 'Real, authentic photographs of our dishes, signature green packaging, and rotisserie chicken.'}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {filterCategories.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-smooth ${
                  activeFilter === f.id
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md ring-2 ring-emerald-400/40'
                    : 'bg-stone-900/80 text-stone-300 hover:bg-emerald-900/40 hover:text-white border border-emerald-900/60'
                }`}
              >
                {isAr ? f.nameAr : f.nameEn}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden bg-stone-900 border border-emerald-800/40 shadow-xl hover:border-emerald-500/70 hover:shadow-2xl cursor-pointer transition-smooth"
            >
              <div className="h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                <img
                  src={photo.imageUrl}
                  alt={isAr ? photo.titleAr : photo.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Hover Overlay with Lightbox indicator */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-amber-400 font-bold">
                    {isAr ? photo.categoryAr : photo.categoryEn}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-600/80 backdrop-blur-sm flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-bold text-base leading-snug">
                  {isAr ? photo.titleAr : photo.titleEn}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  {isAr ? photo.descriptionAr : photo.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-emerald-600/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 end-4 z-10 w-9 h-9 rounded-full bg-stone-800/80 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevPhoto}
              className="absolute start-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-800/80 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute end-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-stone-800/80 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Photo View */}
            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={lightboxPhoto.imageUrl}
                alt={isAr ? lightboxPhoto.titleAr : lightboxPhoto.titleEn}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Caption & Details */}
            <div className="p-5 sm:p-6 bg-stone-950 border-t border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-start">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                  {isAr ? lightboxPhoto.categoryAr : lightboxPhoto.categoryEn}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {isAr ? lightboxPhoto.titleAr : lightboxPhoto.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                  {isAr ? lightboxPhoto.descriptionAr : lightboxPhoto.descriptionEn}
                </p>
              </div>

              <div className="shrink-0">
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  {isAr ? 'شاورمر السنطة المحطة' : 'Shawarmer El Santa'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
