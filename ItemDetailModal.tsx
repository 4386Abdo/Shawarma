import React, { useState } from 'react';
import { useApp } from './AppContext';
import { formatEgyptianCurrency } from './orderCalculations';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

export const ItemDetailModal: React.FC = () => {
  const { language, selectedItemModal, setSelectedItemModal, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!selectedItemModal) return null;

  const isAr = language === 'ar';
  const item = selectedItemModal;

  const handleAdd = () => {
    if (!item.isAvailable) return;
    addToCart(item, quantity, notes.trim() ? notes : undefined);
    setSelectedItemModal(null);
    setQuantity(1);
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs"
        onClick={() => setSelectedItemModal(null)}
      />

      <div className="relative w-full max-w-lg bg-stone-900 text-white rounded-3xl shadow-2xl border border-emerald-800/60 overflow-hidden text-start z-10 my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedItemModal(null)}
          className="absolute top-4 end-4 z-20 w-8 h-8 rounded-full bg-stone-950/80 hover:bg-emerald-700 text-white flex items-center justify-center transition-colors border border-white/10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-950">
          <img
            src={item.image}
            alt={isAr ? item.nameAr : item.nameEn}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 start-4 end-4 text-white">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
              {isAr ? 'شاورمر السنطة المحطة' : 'Shawarmer El Santa'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {isAr ? item.nameAr : item.nameEn}
            </h2>
          </div>
        </div>

        {/* Modal Details */}
        <div className="p-6 space-y-5">
          {/* Metadata strip */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <span>{item.servingSizeAr && isAr ? item.servingSizeAr : item.servingSizeEn}</span>
              {item.calories && (
                <>
                  <span aria-hidden="true" className="text-emerald-600">·</span>
                  <span>{item.calories}</span>
                </>
              )}
            </div>

            <div className="text-end">
              <span className="text-xl font-black text-amber-400 font-mono">
                {formatEgyptianCurrency(item.price, language)}
              </span>
              {item.isPriceEstimate && (
                <span className="block text-[10px] text-emerald-400/80">
                  {isAr ? 'سعر تقديري' : 'Approx. Price'}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-300 leading-relaxed">
            {isAr ? item.descriptionAr : item.descriptionEn}
          </p>

          {/* Special instructions */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              {isAr ? 'ملاحظات أو تعديلات على السندوتش / الوجبة:' : 'Customizations or Notes:'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                isAr
                  ? 'مثال: بدون بصل، زيادة تومية، كاتشب جانبي...'
                  : 'e.g. Extra garlic sauce, no onions...'
              }
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-emerald-800/60 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
            />
          </div>

          {/* Quantity and Add Button */}
          <div className="pt-3 border-t border-emerald-950 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 border border-emerald-900 rounded-xl p-1 bg-stone-950">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-stone-800 border border-emerald-800/60 flex items-center justify-center text-stone-200 hover:bg-emerald-900"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-black font-mono text-sm text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-stone-800 border border-emerald-800/60 flex items-center justify-center text-stone-200 hover:bg-emerald-900"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!item.isAvailable}
              className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-smooth ${
                !item.isAvailable
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg border border-emerald-500/40'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {isAr
                  ? `إضافة للسلة (${formatEgyptianCurrency(item.price * quantity, language)})`
                  : `Add to Cart (${formatEgyptianCurrency(item.price * quantity, language)})`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
