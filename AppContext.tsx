import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CartItem,
  Category,
  GalleryPhoto,
  Language,
  MenuItem,
  Order,
  OrderStatus,
  OrderType,
  RestaurantInfo,
  Theme,
} from './types';
import {
  INITIAL_CATEGORIES,
  INITIAL_GALLERY_PHOTOS,
  INITIAL_MENU_ITEMS,
  INITIAL_RESTAURANT_INFO,
} from './initialData';
import { calculateSubtotal, calculateDeliveryFee, calculateOrderTotal } from './orderCalculations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  restaurantInfo: RestaurantInfo;
  updateRestaurantInfo: (info: Partial<RestaurantInfo>) => void;
  categories: Category[];
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void;
  removeFromCart: (menuItemId: string) => void;
  updateCartQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  orders: Order[];
  createOrder: (customer: {
    name: string;
    phone: string;
    orderType: OrderType;
    deliveryAddress?: string;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  galleryPhotos: GalleryPhoto[];
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (id: string) => void;
  // Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  selectedItemModal: MenuItem | null;
  setSelectedItemModal: (item: MenuItem | null) => void;
  confirmedOrder: Order | null;
  setConfirmedOrder: (order: Order | null) => void;
  lightboxPhoto: GalleryPhoto | null;
  setLightboxPhoto: (photo: GalleryPhoto | null) => void;
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'shawarmer_lang',
  THEME: 'shawarmer_theme',
  INFO: 'shawarmer_info_v1',
  MENU: 'shawarmer_menu_v1',
  CART: 'shawarmer_cart_v1',
  ORDERS: 'shawarmer_orders_v1',
  GALLERY: 'shawarmer_gallery_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language: Default Arabic
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      if (saved === 'ar' || saved === 'en') return saved;
    }
    return 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LANG, lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  // 2. Theme: Dark by default (user's requested deep green dominant theme)
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.THEME, t);
      if (t === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // 3. Restaurant Info
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.INFO);
      if (saved) {
        try {
          return { ...INITIAL_RESTAURANT_INFO, ...JSON.parse(saved) };
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_RESTAURANT_INFO;
  });

  const updateRestaurantInfo = (info: Partial<RestaurantInfo>) => {
    setRestaurantInfo((prev) => {
      const updated = { ...prev, ...info };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.INFO, JSON.stringify(updated));
      }
      return updated;
    });
    showToast(language === 'ar' ? 'تم تحديث بيانات المطعم بنجاح' : 'Restaurant info updated successfully');
  };

  // 4. Menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_MENU_ITEMS;
  });

  const saveMenu = (items: MenuItem[]) => {
    setMenuItems(items);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(items));
    }
  };

  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `item-${Date.now()}`,
    };
    saveMenu([newItem, ...menuItems]);
    showToast(language === 'ar' ? 'تمت إضافة الصنف للمنيو' : 'Item added to menu');
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    const updated = menuItems.map((item) => (item.id === id ? { ...item, ...updates } : item));
    saveMenu(updated);
    showToast(language === 'ar' ? 'تم تعديل بيانات الصنف' : 'Item updated');
  };

  const deleteMenuItem = (id: string) => {
    const updated = menuItems.filter((item) => item.id !== id);
    saveMenu(updated);
    showToast(language === 'ar' ? 'تم حذف الصنف من المنيو' : 'Item deleted from menu');
  };

  const toggleItemAvailability = (id: string) => {
    const updated = menuItems.map((item) =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    );
    saveMenu(updated);
  };

  // 5. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: MenuItem, quantity: number = 1, notes?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItemId === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          notes: notes ? notes : next[existingIndex].notes,
        };
        return next;
      } else {
        return [...prev, { menuItemId: item.id, item, quantity, notes }];
      }
    });
    showToast(language === 'ar' ? `تمت إضافة "${item.nameAr}" إلى السلة` : `Added "${item.nameEn}" to cart`);
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItemId !== menuItemId));
  };

  const updateCartQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
    } else {
      setCart((prev) =>
        prev.map((ci) => (ci.menuItemId === menuItemId ? { ...ci, quantity } : ci))
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = calculateSubtotal(
    cart.map((ci) => ({ price: ci.item.price, quantity: ci.quantity }))
  );

  // 6. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return [
      {
        id: 'ord-sample-1',
        orderNumber: 'SH-101',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        customerName: 'أحمد محمود',
        customerPhone: '01113914564',
        orderType: 'takeaway',
        notes: 'بدون بصل مع زيادة تومية شاورمر',
        items: [
          {
            id: 'item-1',
            nameAr: 'سندوتش شاورما دجاج كلاسيك عربي',
            nameEn: 'Classic Arabic Chicken Shawarma Roll',
            price: 65,
            quantity: 2,
          },
          {
            id: 'item-4',
            nameAr: 'طبق فتة شاورما بالأرز البسمتي',
            nameEn: 'Chicken Shawarma Fatteh & Rice Platter',
            price: 135,
            quantity: 1,
          },
        ],
        subtotal: 265,
        deliveryFee: 0,
        total: 265,
        status: 'preparing',
      },
    ];
  });

  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
    }
  };

  const createOrder = (customer: {
    name: string;
    phone: string;
    orderType: OrderType;
    deliveryAddress?: string;
    notes?: string;
  }): Order => {
    const orderItems = cart.map((ci) => ({
      id: ci.item.id,
      nameAr: ci.item.nameAr,
      nameEn: ci.item.nameEn,
      price: ci.item.price,
      quantity: ci.quantity,
      notes: ci.notes,
    }));

    const subtotal = cartSubtotal;
    const deliveryFee = calculateDeliveryFee(customer.orderType, 15);
    const total = calculateOrderTotal(subtotal, deliveryFee);
    const orderNum = `SH-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customerName: customer.name,
      customerPhone: customer.phone,
      orderType: customer.orderType,
      deliveryAddress: customer.deliveryAddress,
      notes: customer.notes,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      status: 'new',
    };

    saveOrders([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((ord) => (ord.id === orderId ? { ...ord, status } : ord));
    saveOrders(updated);
    showToast(
      language === 'ar' ? `تم تغيير حالة الطلب إلى "${status}"` : `Order status changed to "${status}"`
    );
  };

  const deleteOrder = (orderId: string) => {
    const updated = orders.filter((ord) => ord.id !== orderId);
    saveOrders(updated);
    showToast(language === 'ar' ? 'تم حذف الطلب' : 'Order deleted');
  };

  // 7. Gallery
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_GALLERY_PHOTOS;
  });

  const saveGallery = (photos: GalleryPhoto[]) => {
    setGalleryPhotos(photos);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(photos));
    }
  };

  const addGalleryPhoto = (photoData: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photoData,
      id: `photo-${Date.now()}`,
    };
    saveGallery([newPhoto, ...galleryPhotos]);
    showToast(language === 'ar' ? 'تمت إضافة الصورة للمعرض' : 'Photo added to gallery');
  };

  const deleteGalleryPhoto = (id: string) => {
    const updated = galleryPhotos.filter((p) => p.id !== id);
    saveGallery(updated);
    showToast(language === 'ar' ? 'تم حذف الصورة من المعرض' : 'Photo deleted');
  };

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedItemModal, setSelectedItemModal] = useState<MenuItem | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        restaurantInfo,
        updateRestaurantInfo,
        categories: INITIAL_CATEGORIES,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        galleryPhotos,
        addGalleryPhoto,
        deleteGalleryPhoto,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        selectedItemModal,
        setSelectedItemModal,
        confirmedOrder,
        setConfirmedOrder,
        lightboxPhoto,
        setLightboxPhoto,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
