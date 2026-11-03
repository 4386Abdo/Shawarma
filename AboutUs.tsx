import React from 'react';
import { useApp } from './AppContext';
import { Utensils, Users } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950 text-white border-b border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Column (5 cols) with image montage */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-3.5">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/30 bg-stone-900">
                  <img
                    src="/assets/aistudio/unnamed__3__d885875a.jpg"
                    alt="فراخ مشوية على السيخ في شاورمر السنطة"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 sm:h-52 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/30 bg-stone-900">
                  <img
                    src="/assets/aistudio/unnamed__2__35682aec.jpg"
                    alt="باكت كريسبي دجاج شاورمر"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="space-y-3.5 pt-6">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/30 bg-stone-900">
                  <img
                    src="/assets/aistudio/unnamed_833981b9.jpg"
                    alt="بوكس شاورما عربي عائلي"
                    referrerPolicy="no-referrer"
                    className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-600/30 bg-stone-900">
                  <img
                    src="/assets/aistudio/unnamed__1__cd69f9b1.jpg"
                    alt="طبق فتة شاورما بالأرز البسمتي"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 sm:h-52 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-start">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <span>{isAr ? 'عن مطعمنا' : 'About Our Restaurant'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">{isAr ? 'السنطة المحطة' : 'El Santa Station'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug mb-5 text-balance">
              {isAr
                ? 'شاورمر.. تجربة طعم مختلفة في قلب السنطة'
                : 'Shawarmer: A Unique Taste Experience in the Heart of El Santa'}
            </h2>

            <div className="space-y-4 text-emerald-100/80 text-sm md:text-base leading-relaxed">
              <p>
                {isAr
                  ? 'من قلب السنطة المحطة بمحافظة الغربية، انطلق مطعم "شاورمر" ليقدم لعشاق الشاورما والوجبات السريعة تجربة طعام استثنائية تجمع بين التتبيلة المتوازنة والتحضير الطازج.'
                  : 'Located at El Santa Station in Gharbia Governorate, Shawarmer brings shawarma and fast-food lovers an authentic dining experience featuring balanced seasonings and fresh preparation.'}
              </p>
              <p>
                {isAr
                  ? 'نحرص على تقديم وجبات متكاملة تلبي رغبات الأفراد والعائلات؛ من رولات الشاورما المحمصة بالخبز الصاج والبوكسات العائلية المقطعة، إلى الفراخ المشوية على الفحم والسيخ، وقطع الكريسبي المقرمشة بعناية.'
                  : 'We prepare satisfying meals suitable for individuals, groups, and family gatherings: from toasted saj shawarma rolls and Arabi sharing boxes, to open-flame rotisserie roasted chickens and crunchy crispy chicken buckets.'}
              </p>
              <p>
                {isAr
                  ? 'سواء كنت ترغب في وجبة غداء سريعة أثناء يومك أو عشاء شهي حتى ساعات متأخرة، فريق شاورمر جاهز لاستقبالك وتقديم أفضل خدمة تيك أواي بالسنطة.'
                  : 'Whether you need a quick lunch break or late-night takeaway, the Shawarmer team is delighted to serve you with fast takeaway counter service in El Santa.'}
              </p>
            </div>

            {/* Core Values / Features in deep emerald containers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-emerald-900/60">
              <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-800/50 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {isAr ? 'وجبات طازجة يومياً' : 'Daily Fresh Meals'}
                  </h3>
                  <p className="text-xs text-emerald-200/70 mt-1">
                    {isAr
                      ? 'تحضير مستمر للأسياخ والوجبات عند الطلب لضمان السخونة والطعم.'
                      : 'Prepared continuously on order to guarantee maximum warmth and flavor.'}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-800/50 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">
                    {isAr ? 'مناسب للأفراد والعائلات' : 'Individuals & Families'}
                  </h3>
                  <p className="text-xs text-emerald-200/70 mt-1">
                    {isAr
                      ? 'خيارات متنوعة من السندوتشات الفردية إلى البوكسات الكبيرة.'
                      : 'Diverse options ranging from individual sandwiches to party sharing boxes.'}
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
