"use client";

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import QualitySection from '@/components/QualitySection';
import FeaturedCategories from '@/components/FeaturedCategories';
import PopularProducts from '@/components/PopularProducts';
import DeliverySection from '@/components/DeliverySection';
import DiscountedProducts from '@/components/DiscountedProducts';
import MobileAppSection from '@/components/MobileAppSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <QualitySection />
        <FeaturedCategories />
        <PopularProducts />
        <DeliverySection />
        <DiscountedProducts />
        <MobileAppSection />
      </main>
      <Footer />
    </div>
  );
}