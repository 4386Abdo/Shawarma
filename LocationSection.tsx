import React from 'react';
import { useApp } from './AppContext';
import { MapPin, Phone, ExternalLink, Navigation, Clock } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { language, restaurantInfo } = useApp();
  const isAr = language === 'ar';

  return (
    <section id="location" className="py-16 md:py-24 bg-gradient-to-b from-stone-950 via-emerald-950/80 to-stone-950 border-b border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Details & Action Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between text-start bg-stone-900/90 p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                <span>{isAr ? 'العنوان والموقع' : 'Location & Contacts'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">{isAr ? 'السنطة – الغربية' : 'El Santa – Gharbia'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                {isAr ? 'موقع مطعم شاورمر وطرق التواصل' : 'Shawarmer Location & Contact'}
              </h2>

              <p className="text-sm text-emerald-100/80 mb-6 leading-relaxed">
                {isAr
                  ? 'يسعدنا تشريفكم واستقبال طلباتكم في فرعنا بأبو الجهور بالسنطة المحطة، كما يمكنكم الطلب المسبق هاتفياً لاستلام وجباتكم ساخنة دون انتظار.'
                  : 'We welcome your visit and takeaway orders at our branch in Abu Al Juhour, El Santa Station. Call ahead to prepare your meal ready for pickup.'}
              </p>

              {/* Info Items */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-800/80 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-600/40">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">
                      {isAr ? 'العنوان التفصيلي' : 'Address'}
                    </span>
                    <span className="text-stone-300">
                      {isAr ? restaurantInfo.addressAr : restaurantInfo.addressEn}
                    </span>
                    <span className="block text-[11px] text-emerald-400 font-mono mt-0.5">
                      Plus Code: {restaurantInfo.plusCode}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-800/80 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-600/40">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">
                      {isAr ? 'رقم الهاتف المباشر' : 'Direct Phone'}
                    </span>
                    <a
                      href={`tel:${restaurantInfo.phone}`}
                      dir="ltr"
                      className="text-amber-400 hover:text-amber-300 font-bold font-mono inline-block mt-0.5"
                    >
                      {restaurantInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-800/80 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-600/40">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">
                      {isAr ? 'أوقات العمل والخدمة' : 'Working Hours'}
                    </span>
                    <span className="text-stone-300">
                      {isAr ? restaurantInfo.openingHoursAr : restaurantInfo.openingHoursEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-6 mt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row gap-3">
              <a
                href={restaurantInfo.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-colors border border-emerald-500/40"
              >
                <Navigation className="w-4 h-4" />
                <span>{isAr ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}</span>
              </a>

              <a
                href={`tel:${restaurantInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-bold rounded-xl border border-stone-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'اتصال بالمطعم' : 'Call Restaurant'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-emerald-800/50 bg-stone-900 shadow-2xl flex flex-col relative">
            <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-[350px]">
              <iframe
                title="Shawarmer Google Maps Location in El Santa"
                src="https://maps.google.com/maps?q=Abu+Al+Juhour+El+Santa+Gharbia+Egypt&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full"
              />

              {/* Floating banner on top of map */}
              <div className="absolute top-4 start-4 bg-stone-950/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/40 max-w-xs text-start">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-black text-white text-xs">
                    {isAr ? 'شاورمر (السنطة المحطة)' : 'Shawarmer (El Santa)'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 mt-1">
                  {isAr ? 'أبو الجهور، مركز السنطة، الغربية' : 'Abu Al Juhour, El Santa, Gharbia'}
                </p>
                <a
                  href={restaurantInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 mt-2"
                >
                  <span>{isAr ? 'عرض الاتجاهات' : 'Get Directions'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
