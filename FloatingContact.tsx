import React, { useState } from 'react';
import { useApp } from './AppContext';
import { Phone, MessageCircle, X } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const { language, restaurantInfo } = useApp();
  const [expanded, setExpanded] = useState(false);

  const isAr = language === 'ar';

  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Actions */}
      {expanded && (
        <div className="flex flex-col gap-2 bg-stone-900/95 text-white backdrop-blur-md p-2.5 rounded-2xl shadow-2xl border border-emerald-700/50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <a
            href={`tel:${restaurantInfo.phone}`}
            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-stone-200 hover:text-white hover:bg-emerald-950/80 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-start">
              <span className="block">{isAr ? 'اتصال هاتفياً' : 'Direct Phone Call'}</span>
              <span className="text-[10px] text-amber-400 font-mono" dir="ltr">
                {restaurantInfo.phone}
              </span>
            </div>
          </a>

          <a
            href={`https://wa.me/201113914564?text=${encodeURIComponent(
              'السلام عليكم، أود الاستفسار والطلب من مطعم شاورمر السنطة.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-stone-200 hover:text-white hover:bg-emerald-950/80 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="text-start">
              <span className="block">{isAr ? 'محادثة واتساب' : 'WhatsApp Chat'}</span>
              <span className="text-[10px] text-emerald-300">
                {isAr ? 'استفسار أو طلب سريع' : 'Fast inquiry or order'}
              </span>
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-13 h-13 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/30 border border-emerald-400/40"
        aria-label={isAr ? 'اتصل بشاورمر' : 'Contact Shawarmer'}
      >
        {expanded ? (
          <X className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6 animate-bounce text-amber-300" />
        )}
      </button>
    </div>
  );
};
