/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { FeaturedMenu } from './FeaturedMenu';
import { AboutUs } from './AboutUs';
import { FoodGallery } from './FoodGallery';
import { WhyChooseUs } from './WhyChooseUs';
import { LocationSection } from './LocationSection';
import { CustomerReviews } from './CustomerReviews';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';
import { OrderConfirmationModal } from './OrderConfirmationModal';
import { ItemDetailModal } from './ItemDetailModal';
import { AdminDashboard } from './AdminDashboard';
import { FloatingContact } from './FloatingContact';
import { CheckCircle2 } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toastMessage } = useApp();
  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 start-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-stone-900/95 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-emerald-500/50 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 transition-colors">
      <ToastNotification />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedMenu />
        <AboutUs />
        <FoodGallery />
        <WhyChooseUs />
        <CustomerReviews />
        <LocationSection />
      </main>
      <Footer />

      {/* Interactive Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <ItemDetailModal />
      <AdminDashboard />
      <FloatingContact />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
