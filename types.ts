export type Language = 'ar' | 'en';

export type Theme = 'dark' | 'light';

export type OrderType = 'takeaway' | 'delivery';

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  isPriceEstimate?: boolean;
  isAvailable: boolean;
  image: string;
  tagsAr?: string[];
  tagsEn?: string[];
  calories?: string;
  servingSizeAr?: string;
  servingSizeEn?: string;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
}

export interface CartItem {
  menuItemId: string;
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface OrderItemRecord {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  deliveryAddress?: string;
  notes?: string;
  items: OrderItemRecord[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
}

export interface RestaurantInfo {
  nameAr: string;
  nameEn: string;
  categoryAr: string;
  categoryEn: string;
  governorateAr: string;
  governorateEn: string;
  cityAr: string;
  cityEn: string;
  areaAr: string;
  areaEn: string;
  addressAr: string;
  addressEn: string;
  plusCode: string;
  phone: string;
  whatsapp: string;
  mapsUrl: string;
  rating: number;
  reviewsCount: number;
  openingHoursAr: string;
  openingHoursEn: string;
  deliveryNoticeAr: string;
  deliveryNoticeEn: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  titleAr: string;
  titleEn: string;
  categoryAr: string;
  categoryEn: string;
  imageUrl: string;
  descriptionAr: string;
  descriptionEn: string;
}
