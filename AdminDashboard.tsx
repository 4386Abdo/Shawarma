import React, { useState } from 'react';
import { useApp } from './AppContext';
import { MenuItem, OrderStatus } from './types';
import { formatEgyptianCurrency } from './orderCalculations';
import {
  X,
  Lock,
  Package,
  ShoppingBag,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    language,
    isAdminOpen,
    setIsAdminOpen,
    orders,
    updateOrderStatus,
    deleteOrder,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    restaurantInfo,
    updateRestaurantInfo,
    categories,
    showToast,
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'settings'>('orders');

  // New item form state
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    category: 'shawarma',
    price: 70,
    descriptionAr: '',
    descriptionEn: '',
    image: '/assets/aistudio/unnamed_50cd0a5a.png',
  });

  // Settings form state
  const [settingsData, setSettingsData] = useState({ ...restaurantInfo });

  if (!isAdminOpen) return null;

  const isAr = language === 'ar';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234' || passwordInput.toLowerCase() === 'shawarmer') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleQuickUnlock = () => {
    setPasswordInput('1234');
    setIsAuthenticated(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameAr.trim()) return;

    if (editingItemId) {
      updateMenuItem(editingItemId, {
        nameAr: formData.nameAr,
        nameEn: formData.nameEn || formData.nameAr,
        category: formData.category,
        price: Number(formData.price),
        descriptionAr: formData.descriptionAr,
        descriptionEn: formData.descriptionEn,
        image: formData.image,
      });
      setEditingItemId(null);
    } else {
      addMenuItem({
        nameAr: formData.nameAr,
        nameEn: formData.nameEn || formData.nameAr,
        category: formData.category,
        price: Number(formData.price),
        descriptionAr: formData.descriptionAr,
        descriptionEn: formData.descriptionEn,
        image: formData.image,
        isAvailable: true,
        isPriceEstimate: false,
      });
      setIsAddingItem(false);
    }

    setFormData({
      nameAr: '',
      nameEn: '',
      category: 'shawarma',
      price: 70,
      descriptionAr: '',
      descriptionEn: '',
      image: '/assets/aistudio/unnamed_50cd0a5a.png',
    });
  };

  const handleStartEdit = (item: MenuItem) => {
    setEditingItemId(item.id);
    setFormData({
      nameAr: item.nameAr,
      nameEn: item.nameEn,
      category: item.category,
      price: item.price,
      descriptionAr: item.descriptionAr,
      descriptionEn: item.descriptionEn,
      image: item.image,
    });
    setIsAddingItem(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurantInfo(settingsData);
    showToast(isAr ? 'تم حفظ التعديلات بنجاح' : 'Settings saved successfully');
  };

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
        onClick={() => setIsAdminOpen(false)}
      />

      <div className="relative w-full max-w-4xl bg-stone-900 text-white rounded-3xl shadow-2xl border border-emerald-800/60 overflow-hidden flex flex-col max-h-[90vh] z-10 my-4 text-start">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-900/60 bg-stone-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isAr ? 'لوحة تحكم إدارة شاورمر' : 'Shawarmer Admin Dashboard'}
              </h2>
              <p className="text-[11px] text-emerald-300/80">
                {isAr ? 'إدارة المنيو، الطلبات الواردة، وبيانات المطعم' : 'Manage menu, orders, and restaurant details'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg"
            aria-label="Close admin dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-700/50 text-emerald-400 flex items-center justify-center mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {isAr ? 'تسجيل دخول الإدارة' : 'Admin Login Required'}
            </h3>
            <p className="text-xs text-stone-400 mt-1 max-w-sm">
              {isAr
                ? 'يرجى إدخال رمز المرور للوصول إلى تفاصيل الطلبات وتعديل الأسعار.'
                : 'Enter security passcode to manage orders and menu pricing.'}
            </p>

            <form onSubmit={handleLogin} className="mt-6 w-full max-w-xs space-y-3">
              <div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder={isAr ? 'الرمز السري (الافتراضي: 1234)' : 'Passcode (Default: 1234)'}
                  className="w-full px-4 py-2.5 bg-stone-950 border border-emerald-800/60 rounded-xl text-center font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                />
                {authError && (
                  <p className="text-[11px] text-red-400 mt-1">
                    {isAr ? 'رمز المرور غير صحيح. جرب 1234' : 'Incorrect code. Try 1234'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
              >
                {isAr ? 'تسجيل الدخول' : 'Sign In'}
              </button>

              <button
                type="button"
                onClick={handleQuickUnlock}
                className="w-full py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs rounded-xl transition-colors border border-stone-700"
              >
                {isAr ? 'تسجيل سريع بنقرة واحدة (للمعاينة)' : 'Quick 1-Click Unlock (For Testing)'}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Top Quick Stats Strip */}
            <div className="grid grid-cols-3 divide-x rtl:divide-x-reverse border-b border-emerald-900/60 bg-stone-950 p-3 sm:p-4 text-center">
              <div>
                <span className="block text-base sm:text-xl font-black text-white font-mono">
                  {orders.length}
                </span>
                <span className="text-[10px] sm:text-xs text-stone-400 font-medium">
                  {isAr ? 'إجمالي الطلبات' : 'Total Orders'}
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-xl font-black text-amber-400 font-mono">
                  {formatEgyptianCurrency(totalSales, language)}
                </span>
                <span className="text-[10px] sm:text-xs text-stone-400 font-medium">
                  {isAr ? 'المبيعات المقدرة' : 'Sales Volume'}
                </span>
              </div>
              <div>
                <span className="block text-base sm:text-xl font-black text-emerald-400 font-mono">
                  {menuItems.length}
                </span>
                <span className="text-[10px] sm:text-xs text-stone-400 font-medium">
                  {isAr ? 'أصناف المنيو' : 'Menu Items'}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-emerald-900/60 bg-stone-900 px-4">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAr ? 'الطلبات الواردة' : 'Incoming Orders'}</span>
                <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 rounded-md font-mono text-[10px] border border-emerald-800">
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'menu'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{isAr ? 'إدارة المنيو والأسعار' : 'Menu & Pricing'}</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{isAr ? 'بيانات المطعم' : 'Restaurant Info'}</span>
              </button>
            </div>

            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div className="p-4 sm:p-6 space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-stone-400">
                    <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-stone-600" />
                    <p className="text-sm font-bold">{isAr ? 'لا توجد طلبات واردة حالياً' : 'No incoming orders yet'}</p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl border border-emerald-900/60 bg-stone-950 space-y-3 shadow-lg"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-950 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-amber-400 text-sm">
                            #{ord.orderNumber}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              ord.orderType === 'takeaway'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                            }`}
                          >
                            {ord.orderType === 'takeaway'
                              ? isAr
                                ? 'استلام تيك أواي'
                                : 'Takeaway'
                              : isAr
                              ? 'توصيل محلي'
                              : 'Delivery'}
                          </span>
                        </div>

                        {/* Status selector */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-stone-400">{isAr ? 'الحالة:' : 'Status:'}</span>
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              updateOrderStatus(ord.id, e.target.value as OrderStatus)
                            }
                            className="text-xs font-bold px-2 py-1 bg-stone-900 border border-emerald-800/60 rounded-lg text-white focus:outline-none"
                          >
                            <option value="new">{isAr ? 'جديد (New)' : 'New'}</option>
                            <option value="preparing">{isAr ? 'قيد التجهيز (Preparing)' : 'Preparing'}</option>
                            <option value="ready">{isAr ? 'جاهز للاستلام (Ready)' : 'Ready'}</option>
                            <option value="completed">{isAr ? 'مكتمل (Completed)' : 'Completed'}</option>
                            <option value="cancelled">{isAr ? 'ملغي (Cancelled)' : 'Cancelled'}</option>
                          </select>

                          <button
                            onClick={() => deleteOrder(ord.id)}
                            className="p-1 text-stone-500 hover:text-red-400 rounded"
                            title="Delete order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-stone-400">{isAr ? 'العميل:' : 'Customer:'}</p>
                          <p className="font-bold text-white">{ord.customerName}</p>
                          <p className="font-mono text-emerald-400 font-bold" dir="ltr">
                            {ord.customerPhone}
                          </p>
                        </div>
                        {ord.deliveryAddress && (
                          <div>
                            <p className="text-stone-400">{isAr ? 'عنوان التوصيل:' : 'Address:'}</p>
                            <p className="font-medium text-stone-300">{ord.deliveryAddress}</p>
                          </div>
                        )}
                      </div>

                      {/* Items */}
                      <div className="p-3 bg-stone-900 rounded-xl space-y-1 text-xs border border-emerald-950">
                        {ord.items.map((item, i) => (
                          <div key={i} className="flex justify-between">
                            <span>
                              {isAr ? item.nameAr : item.nameEn} × {item.quantity}
                            </span>
                            <span className="font-mono font-bold text-amber-400">
                              {formatEgyptianCurrency(item.price * item.quantity, language)}
                            </span>
                          </div>
                        ))}
                        <div className="pt-1.5 border-t border-stone-800 flex justify-between font-black text-white">
                          <span>{isAr ? 'المجموع الإجمالي:' : 'Total:'}</span>
                          <span className="font-mono text-emerald-400">
                            {formatEgyptianCurrency(ord.total, language)}
                          </span>
                        </div>
                      </div>

                      {ord.notes && (
                        <p className="text-[11px] text-amber-300/80 italic">
                          📝 {ord.notes}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 2: MENU & PRICING */}
            {activeTab === 'menu' && (
              <div className="p-4 sm:p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">
                    {isAr ? 'قائمة أصناف شاورمر' : 'Menu Dishes & Pricing'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingItem(!isAddingItem);
                      setEditingItemId(null);
                    }}
                    className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAddingItem ? (isAr ? 'إغلاق النموذج' : 'Close Form') : (isAr ? 'إضافة صنف جديد' : 'Add New Item')}</span>
                  </button>
                </div>

                {/* Add/Edit Form */}
                {isAddingItem && (
                  <form
                    onSubmit={handleSaveItem}
                    className="p-4 bg-stone-950 rounded-2xl border border-emerald-800/60 space-y-3 text-xs"
                  >
                    <h4 className="font-bold text-white text-sm">
                      {editingItemId
                        ? isAr
                          ? 'تعديل بيانات الصنف'
                          : 'Edit Menu Item'
                        : isAr
                        ? 'إضافة صنف جديد للمنيو'
                        : 'Add New Dish'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-stone-300 mb-1">
                          {isAr ? 'اسم الصنف بالعربية' : 'Arabic Name'} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nameAr}
                          onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-900 border border-emerald-800/60 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-stone-300 mb-1">
                          {isAr ? 'اسم الصنف بالإنجليزية' : 'English Name'}
                        </label>
                        <input
                          type="text"
                          value={formData.nameEn}
                          onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-900 border border-emerald-800/60 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-stone-300 mb-1">
                          {isAr ? 'القسم' : 'Category'}
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-900 border border-emerald-800/60 rounded-lg text-xs text-white"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {isAr ? c.nameAr : c.nameEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-stone-300 mb-1">
                          {isAr ? 'السعر (ج.م)' : 'Price (EGP)'} *
                        </label>
                        <input
                          type="number"
                          required
                          min={1}
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-stone-900 border border-emerald-800/60 rounded-lg text-xs font-mono font-bold text-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-stone-300 mb-1">
                          {isAr ? 'صورة الصنف' : 'Photo'}
                        </label>
                        <select
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-900 border border-emerald-800/60 rounded-lg text-xs text-white"
                        >
                          <option value="/assets/aistudio/unnamed_50cd0a5a.png">رولات شاورما (Shawarma Rolls)</option>
                          <option value="/assets/aistudio/unnamed_833981b9.jpg">بوكس عربي عائلي (Family Box)</option>
                          <option value="/assets/aistudio/unnamed__1__cd69f9b1.jpg">طبق فتة شاورما (Rice Platter)</option>
                          <option value="/assets/aistudio/unnamed__2__35682aec.jpg">باكت كريسبي (Crispy Bucket)</option>
                          <option value="/assets/aistudio/unnamed__3__d885875a.jpg">فراخ مشوية عالسيخ (Grilled Chicken)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-stone-300 mb-1">
                        {isAr ? 'الوصف بالعربية' : 'Arabic Description'}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.descriptionAr}
                        onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-900 border border-emerald-800/60 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingItem(false);
                          setEditingItemId(null);
                        }}
                        className="px-3 py-1.5 bg-stone-800 text-stone-300 rounded-lg font-bold"
                      >
                        {isAr ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-bold shadow-md"
                      >
                        {isAr ? 'حفظ الصنف' : 'Save Item'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Items List */}
                <div className="divide-y divide-emerald-950 border border-emerald-900/60 rounded-2xl overflow-hidden bg-stone-950">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 flex items-center justify-between gap-3 hover:bg-stone-900/60 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.nameAr}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-emerald-800/60"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-xs truncate">
                            {isAr ? item.nameAr : item.nameEn}
                          </h4>
                          <span className="text-[11px] text-amber-400 font-mono">
                            {formatEgyptianCurrency(item.price, language)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Availability toggle */}
                        <button
                          onClick={() => toggleItemAvailability(item.id)}
                          className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 ${
                            item.isAvailable
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-red-950 text-red-300 border border-red-800'
                          }`}
                          title={isAr ? 'تبديل التوفر' : 'Toggle availability'}
                        >
                          {item.isAvailable ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>{isAr ? 'متوفر' : 'Active'}</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>{isAr ? 'غير متوفر' : 'Disabled'}</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 text-stone-400 hover:text-amber-400 rounded-md"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteMenuItem(item.id)}
                          className="p-1.5 text-stone-400 hover:text-red-400 rounded-md"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: RESTAURANT SETTINGS */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="p-4 sm:p-6 space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-300 mb-1">
                      {isAr ? 'رقم الهاتف المباشر' : 'Phone Number'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={settingsData.phone}
                      onChange={(e) => setSettingsData({ ...settingsData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-950 border border-emerald-800/60 rounded-lg font-mono text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-300 mb-1">
                      {isAr ? 'رقم الواتساب للطلبات' : 'WhatsApp Number'}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={settingsData.whatsapp}
                      onChange={(e) => setSettingsData({ ...settingsData, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-stone-950 border border-emerald-800/60 rounded-lg font-mono text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-300 mb-1">
                    {isAr ? 'العنوان بالعربية' : 'Address (Arabic)'}
                  </label>
                  <input
                    type="text"
                    value={settingsData.addressAr}
                    onChange={(e) => setSettingsData({ ...settingsData, addressAr: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-950 border border-emerald-800/60 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-300 mb-1">
                    {isAr ? 'أوقات العمل' : 'Opening Hours'}
                  </label>
                  <input
                    type="text"
                    value={settingsData.openingHoursAr}
                    onChange={(e) => setSettingsData({ ...settingsData, openingHoursAr: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-950 border border-emerald-800/60 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-300 mb-1">
                    {isAr ? 'رابط خرائط جوجل' : 'Google Maps URL'}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={settingsData.mapsUrl}
                    onChange={(e) => setSettingsData({ ...settingsData, mapsUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-stone-950 border border-emerald-800/60 rounded-lg text-xs font-mono text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isAr ? 'حفظ إعدادات المطعم' : 'Save Restaurant Info'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
