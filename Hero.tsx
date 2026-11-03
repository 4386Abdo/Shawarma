import React from 'react';
import { useApp } from './AppContext';
import { Phone, ArrowDown, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  const { language, restaurantInfo } = useApp();
  const isAr = language === 'ar';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-950 text-white pt-10 pb-16 md:pt-18 md:pb-24 border-b border-emerald-900/40">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 end-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-start">
            {/* Unboxed breadcrumb metadata */}
            <div className="flex items-center gap-2 text-xs md:text-sm text-emerald-300 mb-4 font-semibold tracking-wide">
              <span>{isAr ? 'السنطة المحطة' : 'El Santa Station'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'محافظة الغربية' : 'Gharbia Governorate'}</span>
              <span aria-hidden="true">·</span>
              <span>{isAr ? 'شاورما وتيك أواي' : 'Shawarma & Takeaway'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-5 max-w-2xl text-balance">
              {isAr ? 'الطعم اللي يستاهل التجربة!' : 'The Taste That Deserves To Be Experienced!'}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-emerald-100/90 font-normal leading-relaxed mb-8 max-w-xl">
              {isAr
                ? 'اكتشف طعم الشاورما والوجبات الشهية في شاورمر – السنطة. جودة عالية وتتبيلة أصلية وخدمة تيك أواي سريعة ومميزة.'
                : 'Discover signature shawarma, flame-grilled chicken, and appetizing family meals at Shawarmer – El Santa.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-stone-950 font-black text-base rounded-xl shadow-lg transition-smooth"
              >
                <span>{isAr ? 'استكشف المنيو' : 'Explore Menu'}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={`tel:${restaurantInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-base rounded-xl border border-emerald-600/50 transition-smooth shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>{isAr ? 'اتصل بنا' : 'Call Us'}</span>
                <span dir="ltr" className="text-xs text-amber-300 font-mono font-bold">
                  {restaurantInfo.phone}
                </span>
              </a>
            </div>

            {/* Trust points row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-800/60 max-w-lg">
              <div className="text-start">
                <span className="block text-xl md:text-2xl font-black text-amber-400 font-mono">
                  ★ 4.0
                </span>
                <span className="text-xs text-emerald-200/80 font-medium">
                  {isAr ? 'تقييم خرائط جوجل' : 'Google Rating'}
                </span>
              </div>
              <div className="text-start border-r rtl:border-l rtl:border-r-0 border-emerald-800/60 px-3">
                <span className="block text-xl md:text-2xl font-black text-white font-mono">
                  100%
                </span>
                <span className="text-xs text-emerald-200/80 font-medium">
                  {isAr ? 'فراخ طازجة' : 'Fresh Chicken'}
                </span>
              </div>
              <div className="text-start px-2">
                <span className="block text-xl md:text-2xl font-black text-emerald-400 font-mono">
                  تيك أواي
                </span>
                <span className="text-xs text-emerald-200/80 font-medium">
                  {isAr ? 'سريع ولذيذ' : 'Fast & Tasty'}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Column (5 cols) with authentic Shawarma photo */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Photo Card with emerald rim glow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 bg-stone-900 group">
                <img
                  src="./unnamed_50cd0a5a.png"
                  alt="رولات شاورما الدجاج الطازجة في شاورمر السنطة"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 lg:h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent pointer-events-none" />

                {/* Branded caption badge on photo */}
                <div className="absolute bottom-4 start-4 end-4 p-3.5 bg-stone-950/85 backdrop-blur-md rounded-2xl border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                      {isAr ? 'تصوير حقيقي من داخل المطعم' : 'Authentic Restaurant Photo'}
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {isAr ? 'شاورما الدجاج على سيخ الجمر' : 'Flame Rotisserie Shawarma'}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-black rounded-lg shadow-sm">
                    {isAr ? 'شاورمر' : 'Shawarmer'}
                  </span>
                </div>
              </div>

              {/* Floating location card */}
              <div className="absolute -bottom-5 -start-4 sm:start-2 bg-stone-900 text-stone-100 px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-500/40 hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-start">
                  <p className="text-[10px] text-emerald-300 font-medium">
                    {isAr ? 'الموقع' : 'Location'}
                  </p>
                  <p className="text-xs font-bold text-white">
                    {isAr ? 'السنطة المحطة – أبو الجهور' : 'El Santa Station'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
