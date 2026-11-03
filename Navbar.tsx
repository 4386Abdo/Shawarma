import React, { useState } from 'react';
import { useApp } from './AppContext';
import { BrandLogo } from './BrandLogo';
import { ShoppingBag, Globe, Shield, Phone, Menu, X, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    cartCount,
    setIsCartOpen,
    setIsAdminOpen,
    restaurantInfo,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = language === 'ar';
  const isDark = theme === 'dark';

  const navLinks = [
    { href: '#menu', label: isAr ? 'المنيو' : 'Menu' },
    { href: '#about', label: isAr ? 'عن شاورمر' : 'About Us' },
    { href: '#gallery', label: isAr ? 'معرض الصور' : 'Gallery' },
    { href: '#why-us', label: isAr ? 'لماذا شاورمر' : 'Why Us' },
    { href: '#location', label: isAr ? 'موقعنا والاتصال' : 'Location' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-950/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-emerald-900/60 shadow-lg transition-smooth">
      {/* Top micro announcement bar in rich emerald */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium border-b border-emerald-700/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden sm:inline">
            {isAr
              ? '📍 السنطة المحطة – أبو الجهور، محافظة الغربية'
              : '📍 El Santa Station – Abu Al Juhour, Gharbia'}
          </span>
          <span className="mx-auto sm:mx-0">
            {isAr
              ? '🔥 شاورما على الفحم ووجبات تيك أواي طازجة يومياً'
              : '🔥 Fresh rotisserie shawarma & takeaway meals daily'}
          </span>
          <a
            href={`tel:${restaurantInfo.phone}`}
            className="hidden md:inline-flex items-center gap-1 text-amber-300 hover:text-white transition-colors font-mono font-bold"
          >
            <Phone className="w-3 h-3 text-emerald-300" />
            <span dir="ltr">{restaurantInfo.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation - 3-Zone Architecture */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center shrink-0 group">
          <BrandLogo size="md" />
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold text-stone-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap hover:text-emerald-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Switcher: White & Black */}
          <button
            onClick={toggleTheme}
            className="p-2 text-stone-300 hover:text-amber-400 hover:bg-emerald-950/80 rounded-xl border border-emerald-900/40 transition-colors"
            title={isDark ? (isAr ? 'تفعيل السيم الأبيض' : 'Switch to Light Theme') : (isAr ? 'تفعيل السيم الأسود والأخضر' : 'Switch to Dark Theme')}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-stone-200 hover:text-emerald-300 hover:bg-emerald-950/80 rounded-xl border border-emerald-900/40 transition-colors"
            title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          {/* Admin Dashboard trigger */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="p-2 text-stone-400 hover:text-stone-200 hover:bg-emerald-950/80 rounded-xl border border-emerald-900/30 transition-colors"
            title={isAr ? 'لوحة تحكم الإدارة' : 'Admin Dashboard'}
            aria-label="Admin panel"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center justify-center p-2 text-stone-200 hover:text-emerald-400 hover:bg-emerald-950/80 rounded-xl border border-emerald-900/40 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA Button: Order Now */}
          <a
            href="#menu"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-black text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 rounded-xl shadow-md transition-smooth whitespace-nowrap"
          >
            {isAr ? 'اطلب الآن' : 'Order Now'}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-white rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-900/60 bg-stone-950 px-4 pt-3 pb-5 space-y-2.5 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-semibold text-stone-200 hover:bg-emerald-900/40 hover:text-emerald-400 rounded-lg"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-emerald-900/50 flex gap-2">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 text-center text-sm font-black text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl"
            >
              {isAr ? 'استكشف المنيو واطلب' : 'Explore Menu & Order'}
            </a>
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="px-4 py-2.5 flex items-center justify-center bg-emerald-900/80 text-emerald-200 border border-emerald-700/50 rounded-xl text-sm font-bold"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
