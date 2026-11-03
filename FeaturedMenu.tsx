import React, { useState, useMemo } from 'react';
import { useApp } from './AppContext';
import { MenuItem } from './types';
import { formatEgyptianCurrency } from './orderCalculations';
import { Plus, Search, Check, AlertCircle, Eye } from 'lucide-react';

export const FeaturedMenu: React.FC = () => {
  const {
    language,
    categories,
    menuItems,
    addToCart,
    setSelectedItemModal,
    setIsAdminOpen,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const isAr = language === 'ar';

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        searchLower === '' ||
        item.nameAr.toLowerCase().includes(searchLower) ||
        item.nameEn.toLowerCase().includes(searchLower) ||
        item.descriptionAr.toLowerCase().includes(searchLower) ||
        item.descriptionEn.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable) return;
    addToCart(item, 1);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-gradient-to-b from-stone-950 via-emerald-950/80 to-stone-950 dark:from-stone-950 dark:via-emerald-950/80 dark:to-stone-950 border-b border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <span>{isAr ? 'منيو شاورمر الأصلي' : 'Authentic Shawarmer Menu'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">{isAr ? 'السنطة المحطة' : 'El Santa Station'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {isAr ? 'قائمة الطعام والوجبات' : 'Our Food Menu & Meals'}
            </h2>
            <p className="text-sm md:text-base text-emerald-100/80 mt-2 max-w-xl">
              {isAr
                ? 'استمتع بأشهى رولات الشاورما، بوكسات العائلات، دجاج مشوي عالسيخ، وأطباق الفتة المميزة. جميع الوجبات تحضر طازجة.'
                : 'Enjoy our signature chicken shawarma rolls, family sharing boxes, flame-grilled chicken, and platters.'}
            </p>
          </div>

          {/* Search bar with emerald focus ring */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-emerald-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في المنيو...' : 'Search menu...'}
              className="w-full ps-9 pe-4 py-2.5 bg-stone-900/90 text-white border border-emerald-800/60 rounded-xl text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Pricing Notice & Admin Edit Disclosure */}
        <div className="mb-6 p-3.5 bg-emerald-900/40 border border-emerald-700/50 rounded-2xl flex items-center justify-between gap-3 text-xs text-emerald-100 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">ℹ️</span>
            <span>
              {isAr
                ? 'ملاحظة: الأسعار المعروضة استرشادية بحسب السوق، ويمكن تعديل جميع الأسعار والأصناف فورياً عبر لوحة الإدارة.'
                : 'Note: Displayed prices are representative and can be customized in real-time via the Admin Dashboard.'}
            </span>
          </div>
          <button
            onClick={() => setIsAdminOpen(true)}
            className="font-bold text-amber-300 hover:text-amber-200 underline whitespace-nowrap shrink-0"
          >
            {isAr ? 'تعديل الأسعار' : 'Edit Prices'}
          </button>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl whitespace-nowrap transition-smooth ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md ring-2 ring-emerald-400/40'
                : 'bg-stone-900/80 text-stone-300 hover:bg-emerald-900/40 hover:text-white border border-emerald-900/60'
            }`}
          >
            {isAr ? 'جميع الأصناف' : 'All Items'}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl whitespace-nowrap transition-smooth ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md ring-2 ring-emerald-400/40'
                  : 'bg-stone-900/80 text-stone-300 hover:bg-emerald-900/40 hover:text-white border border-emerald-900/60'
              }`}
            >
              {isAr ? cat.nameAr : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Product Cards Grid with Deep Emerald Cards */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/60 rounded-3xl border border-emerald-900/50">
            <AlertCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="text-base font-bold text-white">
              {isAr ? 'لا توجد نتائج مطابقة لبحثك' : 'No items match your search'}
            </p>
            <p className="text-xs text-stone-400 mt-1">
              {isAr ? 'جرّب البحث بكلمات أخرى أو اختر قسماً آخر' : 'Try searching for different items or select another category'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isAdded = addedItemIds[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemModal(item)}
                  className="group bg-gradient-to-b from-stone-900/90 to-emerald-950/60 rounded-3xl overflow-hidden border border-emerald-800/40 shadow-xl hover:border-emerald-500/70 hover:shadow-2xl transition-smooth flex flex-col cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={isAr ? item.nameAr : item.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Quick view hover icon */}
                    <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3.5 py-1.5 bg-stone-900/90 text-white text-xs font-bold rounded-xl shadow-lg border border-emerald-500/40 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        {isAr ? 'عرض التفاصيل' : 'View Details'}
                      </span>
                    </div>

                    {/* Availability / Status badge */}
                    {!item.isAvailable && (
                      <div className="absolute top-2.5 start-2.5 px-2.5 py-1 bg-red-600/90 text-white text-[11px] font-bold rounded-lg shadow-sm backdrop-blur-xs">
                        {isAr ? 'غير متوفر حالياً' : 'Currently Unavailable'}
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between text-start">
                    <div>
                      {/* Quiet unboxed metadata */}
                      <div className="flex items-center gap-2 text-[11px] text-emerald-300 mb-1.5 font-medium">
                        <span>
                          {item.servingSizeAr && isAr
                            ? item.servingSizeAr
                            : item.servingSizeEn || (isAr ? 'وجبة طازجة' : 'Fresh Meal')}
                        </span>
                        {item.calories && (
                          <>
                            <span aria-hidden="true" className="text-emerald-600">·</span>
                            <span>{item.calories}</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {isAr ? item.nameAr : item.nameEn}
                      </h3>

                      {/* Secondary subtitle */}
                      <p className="text-[11px] text-stone-400 mt-0.5 font-mono line-clamp-1">
                        {isAr ? item.nameEn : item.nameAr}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-stone-300 mt-2 line-clamp-2 leading-relaxed">
                        {isAr ? item.descriptionAr : item.descriptionEn}
                      </p>
                    </div>

                    {/* Price and Add button */}
                    <div className="pt-4 mt-3 border-t border-emerald-900/50 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-base md:text-lg font-black text-amber-400 font-mono">
                          {formatEgyptianCurrency(item.price, language)}
                        </span>
                        {item.isPriceEstimate && (
                          <span className="block text-[10px] text-emerald-400/80">
                            {isAr ? 'سعر تقديري' : 'Approx. Price'}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        disabled={!item.isAvailable}
                        className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-smooth ${
                          !item.isAvailable
                            ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                            : isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white shadow-md border border-emerald-500/40'
                        }`}
                        aria-label={isAr ? `إضافة ${item.nameAr} إلى السلة` : `Add ${item.nameEn} to cart`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>{isAr ? 'تمت الإضافة' : 'Added'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{isAr ? 'إضافة' : 'Add'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
