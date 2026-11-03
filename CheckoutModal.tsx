import React, { useState } from 'react';
import { useApp } from './AppContext';
import {
  calculateDeliveryFee,
  calculateOrderTotal,
  formatEgyptianCurrency,
  isValidEgyptianPhone,
  generateWhatsAppOrderMessage,
} from './orderCalculations';
import { OrderType } from './types';
import { X, CheckCircle, MessageSquare, AlertCircle, ShoppingBag, MapPin } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    language,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    createOrder,
    setConfirmedOrder,
    restaurantInfo,
    showToast,
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const isAr = language === 'ar';
  const deliveryFee = calculateDeliveryFee(orderType, 15);
  const total = calculateOrderTotal(cartSubtotal, deliveryFee);

  const handleSubmitOrder = (e: React.FormEvent, sendToWhatsApp: boolean = false) => {
    e.preventDefault();

    if (!isValidEgyptianPhone(customerPhone)) {
      setPhoneError(
        isAr
          ? 'يرجى إدخال رقم هاتف مصري صحيح (مثال: 01113914564 أو 010...)'
          : 'Please enter a valid Egyptian mobile number (e.g. 01113914564)'
      );
      return;
    }
    setPhoneError(null);

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      showToast(isAr ? 'يرجى كتابة عنوان التوصيل بالتفصيل' : 'Please provide your delivery address');
      return;
    }

    const newOrder = createOrder({
      name: customerName,
      phone: customerPhone,
      orderType,
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      notes: orderNotes.trim() ? orderNotes : undefined,
    });

    setIsCheckoutOpen(false);
    setConfirmedOrder(newOrder);

    if (sendToWhatsApp) {
      const waMsg = generateWhatsAppOrderMessage({
        orderNumber: newOrder.orderNumber,
        customerName: newOrder.customerName,
        customerPhone: newOrder.customerPhone,
        orderType: newOrder.orderType,
        items: newOrder.items,
        total: newOrder.total,
        deliveryAddress: newOrder.deliveryAddress,
        notes: newOrder.notes,
      });
      const whatsappUrl = `https://wa.me/201113914564?text=${waMsg}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-stone-900 text-white rounded-3xl shadow-2xl border border-emerald-800/60 overflow-hidden text-start z-10 my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-emerald-900/60 flex items-center justify-between bg-stone-950">
          <div>
            <h2 className="text-lg font-bold text-white">
              {isAr ? 'إتمام طلب الوجبة' : 'Complete Your Order'}
            </h2>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              {isAr
                ? 'مطعم شاورمر – السنطة المحطة (الدفع نقداً عند الاستلام)'
                : 'Shawarmer – El Santa Station (Cash on Pickup/Delivery)'}
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-stone-400 hover:text-white rounded-lg"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={(e) => handleSubmitOrder(e, false)} className="p-5 sm:p-6 space-y-5">
          {/* Order Type Toggle */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-2">
              {isAr ? 'طريقة استلام الطلب:' : 'Order Pickup Method:'}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-smooth ${
                  orderType === 'takeaway'
                    ? 'border-emerald-500 bg-emerald-950/80 text-white ring-2 ring-emerald-500/30'
                    : 'border-emerald-950 bg-stone-950/80 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <span>{isAr ? 'تيك أواي (استلام من المحل)' : 'Takeaway (Counter Pickup)'}</span>
                <span className="text-[10px] text-emerald-400/80 font-normal">
                  {isAr ? 'السنطة المحطة' : 'El Santa Station'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-smooth ${
                  orderType === 'delivery'
                    ? 'border-emerald-500 bg-emerald-950/80 text-white ring-2 ring-emerald-500/30'
                    : 'border-emerald-950 bg-stone-950/80 text-stone-300 hover:bg-stone-800'
                }`}
              >
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>{isAr ? 'توصيل محلي بالسنطة' : 'Local Delivery in El Santa'}</span>
                <span className="text-[10px] text-emerald-400/80 font-normal">
                  {isAr ? '+ 15 ج.م رسوم توصيل' : '+ 15 EGP Delivery fee'}
                </span>
              </button>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              {isAr ? 'الاسم الكريم' : 'Full Name'} *
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={isAr ? 'مثال: أحمد عبد الله' : 'e.g. Ahmed Abdullah'}
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-emerald-800/60 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
            />
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              {isAr ? 'رقم الهاتف المحمول (مصر)' : 'Egyptian Mobile Number'} *
            </label>
            <input
              type="tel"
              required
              dir="ltr"
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value);
                setPhoneError(null);
              }}
              placeholder="01113914564"
              className={`w-full px-3.5 py-2.5 bg-stone-950 border rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${
                phoneError ? 'border-red-500 focus:border-red-500' : 'border-emerald-800/60 focus:border-emerald-500'
              }`}
            />
            {phoneError ? (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{phoneError}</span>
              </p>
            ) : (
              <p className="text-[10px] text-stone-400 mt-1">
                {isAr
                  ? 'سيتم التواصل معك على هذا الرقم لتأكيد تجهيز الطلب'
                  : 'We will confirm your order preparation via this number'}
              </p>
            )}
          </div>

          {/* Delivery Address (if selected) */}
          {orderType === 'delivery' && (
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                {isAr ? 'عنوان التوصيل بالتفصيل بالسنطة' : 'Detailed Delivery Address in El Santa'} *
              </label>
              <textarea
                rows={2}
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder={
                  isAr
                    ? 'مثال: السنطة، شارع المحطة، بجوار صيدلية... عمارة 5 الدور 2'
                    : 'Street name, landmark, building and floor'
                }
                className="w-full px-3.5 py-2.5 bg-stone-950 border border-emerald-800/60 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              {isAr ? 'ملاحظات خاصة على الوجبة (اختياري)' : 'Special Instructions (Optional)'}
            </label>
            <input
              type="text"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder={
                isAr
                  ? 'مثال: زيادة تومية، بدون مخلل، شطة إضافية...'
                  : 'e.g. Extra garlic sauce, no pickles...'
              }
              className="w-full px-3.5 py-2.5 bg-stone-950 border border-emerald-800/60 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
            />
          </div>

          {/* Items Summary Strip */}
          <div className="p-3.5 bg-stone-950 rounded-2xl border border-emerald-900/50 space-y-1.5 text-xs text-stone-300">
            <div className="flex justify-between">
              <span>{isAr ? 'قيمة الوجبات:' : 'Items Subtotal:'}</span>
              <span className="font-mono font-bold text-amber-400">
                {formatEgyptianCurrency(cartSubtotal, language)}
              </span>
            </div>
            {orderType === 'delivery' && (
              <div className="flex justify-between text-stone-400">
                <span>{isAr ? 'رسوم التوصيل:' : 'Delivery Fee:'}</span>
                <span className="font-mono font-bold text-amber-400">
                  {formatEgyptianCurrency(deliveryFee, language)}
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-emerald-900/60 flex justify-between font-black text-white text-sm">
              <span>{isAr ? 'المجموع الإجمالي:' : 'Total Payable:'}</span>
              <span className="font-mono text-emerald-400 text-base">
                {formatEgyptianCurrency(total, language)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-colors border border-emerald-500/40"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isAr ? 'تأكيد وإرسال الطلب للمطعم' : 'Confirm & Place Order'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmitOrder(e, true)}
              className="w-full py-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/60 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'إرسال الطلب عبر الواتساب مباشرة' : 'Send Order via WhatsApp'}</span>
            </button>

            <div className="text-center pt-1">
              <span className="text-[11px] text-stone-400">
                {isAr
                  ? 'أو يمكنك الاتصال مباشرة على: '
                  : 'Or call restaurant directly at: '}
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  dir="ltr"
                  className="font-bold text-amber-400 underline font-mono"
                >
                  {restaurantInfo.phone}
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
