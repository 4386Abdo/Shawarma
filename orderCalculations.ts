import { OrderType } from './types';

export function calculateSubtotal(items: { price: number; quantity: number }[]): number {
  if (!items || items.length === 0) return 0;
  return items.reduce((sum, item) => {
    const qty = Math.max(0, item.quantity || 0);
    const p = Math.max(0, item.price || 0);
    return sum + (p * qty);
  }, 0);
}

export function calculateDeliveryFee(orderType: OrderType, deliveryFeeConfig: number = 15): number {
  if (orderType === 'takeaway') return 0;
  return Math.max(0, deliveryFeeConfig);
}

export function calculateOrderTotal(subtotal: number, deliveryFee: number): number {
  return Math.max(0, subtotal) + Math.max(0, deliveryFee);
}

export function formatEgyptianCurrency(amount: number, lang: 'ar' | 'en' = 'ar'): string {
  const rounded = Math.round(amount);
  if (lang === 'ar') {
    return `${rounded} ج.م`;
  }
  return `${rounded} EGP`;
}

export function isValidEgyptianPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()+]/g, '');
  const regexLocal = /^01[0125][0-9]{8}$/;
  const regexIntl = /^201[0125][0-9]{8}$/;
  return regexLocal.test(cleaned) || regexIntl.test(cleaned);
}

export function normalizePhoneForCalling(phone: string): string {
  if (!phone) return '+201113914564';
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (cleaned.startsWith('01')) {
    return `+20${cleaned.substring(1)}`;
  }
  if (cleaned.startsWith('20')) {
    return `+${cleaned}`;
  }
  if (cleaned.startsWith('+')) {
    return cleaned;
  }
  return `+20${cleaned}`;
}

export function generateWhatsAppOrderMessage(order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderType: string;
  items: { nameAr: string; quantity: number; price: number }[];
  total: number;
  deliveryAddress?: string;
  notes?: string;
}): string {
  const typeText = order.orderType === 'takeaway' ? 'استلام من المحل (تيك أواي)' : 'توصيل محلي بالسنطة';
  
  let msg = `*طلب جديد من موقع شاورمر (رقم #${order.orderNumber})*\n\n`;
  msg += `👤 *الاسم:* ${order.customerName}\n`;
  msg += `📱 *رقم الهاتف:* ${order.customerPhone}\n`;
  msg += `🛵 *نوع الطلب:* ${typeText}\n`;
  
  if (order.deliveryAddress) {
    msg += `📍 *العنوان:* ${order.deliveryAddress}\n`;
  }
  
  msg += `\n*تفاصيل الطلب:*\n`;
  order.items.forEach((item, idx) => {
    msg += `${idx + 1}. ${item.nameAr} × ${item.quantity} = ${item.price * item.quantity} ج.م\n`;
  });
  
  msg += `\n💵 *الإجمالي:* ${order.total} ج.م\n`;
  
  if (order.notes) {
    msg += `📝 *ملاحظات خاصة:* ${order.notes}\n`;
  }
  
  msg += `\nشكراً لكم! مطعم شاورمر - السنطة المحطة`;
  return encodeURIComponent(msg);
}
