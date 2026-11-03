import React from 'react';
import { useApp } from './AppContext';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, ExternalLink, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, restaurantInfo, setIsAdminOpen } = useApp();
  const isAr = language === 'ar';

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-start">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="text-white">
              <BrandLogo size="lg" />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {isAr
                ? 'مطعم شاورمر – السنطة المحطة، الغربية. شاورما دجاج، فراخ مشوية، بوكسات عائلية، وباكت كريسبي طازج يومياً.'
                : 'Shawarmer Restaurant – El Santa Station, Gharbia. Fresh shawarma rolls, flame-grilled chicken, and family meals.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={restaurantInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors text-xs font-bold border border-emerald-900/60"
                aria-label="Facebook"
              >
                Fb
              </a>
              <a
                href={restaurantInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors text-xs font-bold border border-emerald-900/60"
                aria-label="Instagram"
              >
                Ig
              </a>
              <a
                href={restaurantInfo.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-stone-900 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors text-xs font-bold border border-emerald-900/60"
                aria-label="TikTok"
              >
                Tk
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {isAr ? 'روابط الموقع' : 'Navigation'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'منيو الطعام والوجبات' : 'Food Menu & Meals'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'عن شاورمر السنطة' : 'About Shawarmer'}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'معرض الصور الحقيقية' : 'Authentic Food Gallery'}
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'لماذا يختارنا الزبائن' : 'Why Choose Us'}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  {isAr ? 'الموقع وخريطة جوجل' : 'Location & Google Map'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {isAr ? 'التواصل والطلبات' : 'Contact & Orders'}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-400">{isAr ? 'الهاتف المباشر:' : 'Direct Phone:'}</span>
                  <a
                    href={`tel:${restaurantInfo.phone}`}
                    dir="ltr"
                    className="text-amber-400 font-mono font-bold hover:text-amber-300 transition-colors"
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-stone-400">{isAr ? 'العنوان:' : 'Address:'}</span>
                  <span className="text-stone-300 leading-relaxed block">
                    {isAr ? restaurantInfo.addressAr : restaurantInfo.addressEn}
                  </span>
                  <span className="text-emerald-400 text-[11px] font-mono">
                    Plus Code: {restaurantInfo.plusCode}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Working hours & Google map */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">
              {isAr ? 'الخدمة وموقعنا' : 'Service & Map'}
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              {isAr ? restaurantInfo.openingHoursAr : restaurantInfo.openingHoursEn}
            </p>

            <a
              href={restaurantInfo.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 rounded-xl text-xs font-bold transition-colors border border-emerald-700/50"
            >
              <span>{isAr ? 'موقعنا على خرائط جوجل' : 'Google Maps Listing'}</span>
              <ExternalLink className="w-3 h-3 text-amber-300" />
            </a>

            <div className="mt-4">
              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-white transition-colors"
              >
                <Shield className="w-3 h-3 text-emerald-500" />
                <span>{isAr ? 'دخول لوحة الإدارة' : 'Admin Portal'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-emerald-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} {isAr ? 'مطعم شاورمر – السنطة المحطة. جميع الحقوق محفوظة.' : 'Shawarmer Restaurant – El Santa Station. All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{isAr ? 'شاورما وتيك أواي' : 'Shawarma & Fast Food'}</span>
            <span>·</span>
            <span>{isAr ? 'السنطة – محافظة الغربية' : 'El Santa – Gharbia'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
