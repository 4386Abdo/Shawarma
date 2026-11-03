import React from 'react';
import { useApp } from './AppContext';
import { formatEgyptianCurrency, generateWhatsAppOrderMessage } from './orderCalculations';
import { CheckCircle2, Phone, MessageSquare } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { language, confirmedOrder, setConfirmedOrder, restaurantInfo } = useApp();

  if (!confirmedOrder) return null;

  const isAr = language === 'ar';

  const handleOpenWhatsApp = () => {
    const waMsg = generateWhatsAppOrderMessage({
      orderNumber: confirmedOrder.orderNumber,
      customerName: confirmedOrder.customerName,
      customerPhone: confirmedOrder.customerPhone,
      orderType: confirmedOrder.orderType,
      items: confirmedOrder.items,
      total: confirmedOrder.total,
      deliveryAddress: confirmedOrder.deliveryAddress,
      notes: confirmedOrder.notes,
    });
    window.open(`https://wa.me/201113914564?text=${waMsg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs"
        onClick={() => setConfirmedOrder(null)}
      />

      <div className="relative w-full max-w-lg bg-stone-900 text-white rounded-3xl shadow-2xl border border-emerald-800/60 overflow-hidden text-start z-10 my-8">
        {/* Success Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 text-white p-6 text-center border-b border-emerald-600/40">
          <div className="w-14 h-14 rounded-full bg-emerald-950/40 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-emerald-400/30">
            <CheckCircle2 className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-xl font-black">
            {isAr ? 'تم استلام طلبك بنجاح!' : 'Order Received Successfully!'}
          </h2>
          <p className="text-xs text-emerald-200 mt-1 font-mono font-bold">
            {isAr
              ? `رقم الطلب: #${confirmedOrder.orderNumber}`
              : `Order Number: #${confirmedOrder.orderNumber}`}
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-4">
          {/* Order Meta */}
          <div className="p-4 bg-stone-950 rounded-2xl border border-emerald-900/60 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-400">{isAr ? 'العميل:' : 'Customer:'}</span>
              <span className="font-bold text-white">{confirmedOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">{isAr ? 'رقم الهاتف:' : 'Phone:'}</span>
              <span className="font-bold text-amber-400 font-mono" dir="ltr">
                {confirmedOrder.customerPhone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">{isAr ? 'نوع الطلب:' : 'Order Type:'}</span>
              <span className="font-bold text-emerald-400">
                {confirmedOrder.orderType === 'takeaway'
                  ? isAr
                    ? 'استلام من المحل (تيك أواي)'
                    : 'Takeaway Pickup'
                  : isAr
                  ? 'توصيل محلي بالسنطة'
                  : 'Local Delivery'}
              </span>
            </div>
            {confirmedOrder.deliveryAddress && (
              <div className="flex justify-between">
                <span className="text-stone-400">{isAr ? 'العنوان:' : 'Address:'}</span>
                <span className="font-medium text-stone-200 text-end max-w-xs">
                  {confirmedOrder.deliveryAddress}
                </span>
              </div>
            )}
            {confirmedOrder.notes && (
              <div className="flex justify-between pt-1 border-t border-emerald-950">
                <span className="text-stone-400">{isAr ? 'ملاحظات:' : 'Notes:'}</span>
                <span className="text-stone-300 text-end">{confirmedOrder.notes}</span>
              </div>
            )}
          </div>

          {/* Items breakdown */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              {isAr ? 'قائمة الأصناف:' : 'Order Items:'}
            </h4>
            <div className="divide-y divide-emerald-950 border border-emerald-900/60 rounded-2xl overflow-hidden bg-stone-950">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">
                      {isAr ? item.nameAr : item.nameEn}
                    </span>
                    <span className="text-emerald-400 ms-2 font-mono">
                      × {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold font-mono text-amber-400">
                    {formatEgyptianCurrency(item.price * item.quantity, language)}
                  </span>
                </div>
              ))}
              <div className="p-3.5 bg-emerald-950/60 flex items-center justify-between text-sm font-black text-white">
                <span>{isAr ? 'الإجمالي المطلوب:' : 'Total Amount:'}</span>
                <span className="font-mono text-amber-400 text-base">
                  {formatEgyptianCurrency(confirmedOrder.total, language)}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Follow-up Actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors border border-emerald-500/40"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>{isAr ? 'متابعة الطلب عبر الواتساب' : 'Follow up via WhatsApp'}</span>
            </button>

            <a
              href={`tel:${restaurantInfo.phone}`}
              className="w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-stone-700"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>
                {isAr
                  ? `اتصال بالمطعم (${restaurantInfo.phone})`
                  : `Call Restaurant (${restaurantInfo.phone})`}
              </span>
            </a>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setConfirmedOrder(null)}
              className="text-xs text-stone-400 hover:text-white underline font-medium"
            >
              {isAr ? 'العودة للموقع' : 'Back to Website'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
