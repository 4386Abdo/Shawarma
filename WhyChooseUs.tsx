import React from 'react';
import { useApp } from './AppContext';
import { UtensilsCrossed, ShoppingBag, SunMoon, PhoneCall, MapPin } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  const features = [
    {
      icon: UtensilsCrossed,
      titleAr: 'طعم شهي وتتبيلة مميزة',
      titleEn: 'Delicious Taste & Seasoning',
      descAr: 'خلطات شاورما وتتبيلات مشويات متقنة تحضر يومياً لتقديم أشهى نكهة للزبائن.',
      descEn: 'Authentic spice blends prepared daily for rotisserie chicken and sliced shawarma.',
    },
    {
      icon: ShoppingBag,
      titleAr: 'خدمة تيك أواي سريعة ومريحة',
      titleEn: 'Convenient Takeaway Service',
      descAr: 'تغليف نظيف ومرتب في بوكسات شاورمر الخضراء لسهولة الحمل والاستمتاع بأكلك ساخناً.',
      descEn: 'Signature green boxed takeaway packaging keeping your meal fresh and hot on the go.',
    },
    {
      icon: SunMoon,
      titleAr: 'وجبات للغداء والعشاء وسهرات الليل',
      titleEn: 'Lunch, Dinner & Late-Night Meals',
      descAr: 'جاهزون لاستقبالكم وتقديم الوجبات من وقت الظهيرة وحتى ساعات الليل المتأخرة.',
      descEn: 'Serving customers continuously from noon through dinner and late-night cravings.',
    },
    {
      icon: PhoneCall,
      titleAr: 'طلب سهل ومباشر عبر الهاتف',
      titleEn: 'Quick & Direct Phone Ordering',
      descAr: 'اتصل بنا مباشرة أو اطلب عبر الواتساب لتجهيز طلبك قبل وصولك للاستلام.',
      descEn: 'Call us directly or send a WhatsApp order to have your meal ready for pickup.',
    },
    {
      icon: MapPin,
      titleAr: 'موقع حيوي بالسنطة المحطة',
      titleEn: 'Convenient El Santa Location',
      descAr: 'في موقع قريب ومتاح لجميع أهالي السنطة والقرى المجاورة بأبو الجهور بمحافظة الغربية.',
      descEn: 'Easily accessible at El Santa Station (Abu Al Juhour) for residents and visitors.',
    },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950 border-b border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <span>{isAr ? 'مميزات شاورمر' : 'Why Choose Us'}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400">{isAr ? 'خدمة متميزة' : 'Dedicated Service'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            {isAr ? 'لماذا يختار أهالي السنطة مطعم شاورمر؟' : 'Why Customers Choose Shawarmer'}
          </h2>
          <p className="text-sm md:text-base text-emerald-100/80 mt-2">
            {isAr
              ? 'نحرص على أن تكون كل وجبة تستلمها من شاورمر تجربة طعام مرضية وسريعة ومميزة.'
              : 'Dedicated to providing delicious taste, fast takeaway, and friendly service in El Santa.'}
          </p>
        </div>

        {/* 5 Feature Cards Grid in rich emerald boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border border-emerald-800/40 bg-gradient-to-b from-stone-900/90 to-emerald-950/60 hover:border-emerald-500/60 hover:shadow-2xl transition-smooth text-start ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-amber-300 flex items-center justify-center mb-4 shadow-md border border-emerald-500/40">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {isAr ? feat.titleAr : feat.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {isAr ? feat.descAr : feat.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
