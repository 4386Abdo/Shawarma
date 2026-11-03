import React from 'react';
import { useApp } from './AppContext';
import { formatEgyptianCurrency } from './orderCalculations';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    language,
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartCount,
    setIsCheckoutOpen,
  } = useApp();

  if (!isCartOpen) return null;

  const isAr = language === 'ar';

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 end-0 max-w-full flex pl-10 rtl:pr-10 rtl:pl-0">
        <div className="w-screen max-w-md bg-stone-950 text-white shadow-2xl flex flex-col border-s border-emerald-900/50">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-emerald-900/60 flex items-center justify-between bg-stone-900/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base font-bold text-white">
                {isAr ? 'سلة الطلبات' : 'Your Order Cart'}
              </h2>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 bg-emerald-700 text-white text-xs font-black rounded-lg">
                  {cartCount}
                </span>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-emerald-900/50 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {isAr ? 'سلتك فارغة حالياً' : 'Your cart is empty'}
                </h3>
                <p className="text-xs text-stone-400 mt-1 max-w-xs">
                  {isAr
                    ? 'استكشف منيو شاورمر اللذيذ وأضف وجباتك المفضلة لبدء الطلب.'
                    : 'Explore the menu to add delicious shawarma, grilled chicken, and meals.'}
                </p>
                <a
                  href="#menu"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs font-bold rounded-xl shadow-md border border-emerald-500/40"
                >
                  {isAr ? 'تصفح المنيو الآن' : 'Browse Menu Now'}
                </a>
              </div>
            ) : (
              cart.map((cartItem) => {
                const item = cartItem.item;
                return (
                  <div
                    key={cartItem.menuItemId}
                    className="p-3.5 bg-stone-900/90 rounded-2xl border border-emerald-800/40 flex gap-3 items-center shadow-md"
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={isAr ? item.nameAr : item.nameEn}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-emerald-700/40"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 text-start">
                      <h4 className="text-xs font-bold text-white truncate">
                        {isAr ? item.nameAr : item.nameEn}
                      </h4>
                      <p className="text-xs font-black text-amber-400 font-mono mt-0.5">
                        {formatEgyptianCurrency(item.price, language)}
                      </p>
                      {cartItem.notes && (
                        <p className="text-[10px] text-stone-400 truncate mt-0.5">
                          {cartItem.notes}
                        </p>
                      )}

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateCartQuantity(cartItem.menuItemId, cartItem.quantity - 1)
                          }
                          className="w-6 h-6 rounded-md bg-stone-800 border border-emerald-800 flex items-center justify-center text-stone-200 hover:bg-emerald-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="text-xs font-bold font-mono px-1 text-white">
                          {cartItem.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateCartQuantity(cartItem.menuItemId, cartItem.quantity + 1)
                          }
                          className="w-6 h-6 rounded-md bg-stone-800 border border-emerald-800 flex items-center justify-center text-stone-200 hover:bg-emerald-900"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(cartItem.menuItemId)}
                      className="p-2 text-stone-400 hover:text-red-400 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Subtotal & Proceed CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-emerald-900/60 bg-stone-900/90 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <button
                  onClick={clearCart}
                  className="text-stone-400 hover:text-red-400 underline font-medium"
                >
                  {isAr ? 'تفريغ السلة' : 'Clear Cart'}
                </button>
                <span className="text-emerald-400/80">
                  {isAr ? 'الأسعار تشمل التحضير والتغليف' : 'Prices include packaging'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-200">
                  {isAr ? 'إجمالي الطلب:' : 'Subtotal:'}
                </span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  {formatEgyptianCurrency(cartSubtotal, language)}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-smooth border border-emerald-500/40"
              >
                <span>{isAr ? 'متابعة تفاصيل الطلب' : 'Proceed to Checkout'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
