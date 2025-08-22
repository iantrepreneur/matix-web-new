"use client";

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Le Meilleur Hub",
      subtitle: "Numérique Avicole du Sénégal",
      description: "Connecte producteurs, vétérinaires et acheteurs via une plateforme unique mobile-first commandable par la voix en wolof",
      image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const coupons = [
    {
      title: "Promo Ramadan",
      discount: "10% Off",
      status: "Inactive",
      code: "RAMADAN25",
      image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "This coupon apply when shopping more then 50,000 FCFA"
    },
    {
      title: "Nouveau Client", 
      discount: "5,000 FCFA Off",
      status: "Inactive",
      code: "NEWBIRD50",
      image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "This coupon apply when shopping more then 25,000 FCFA"
    }
  ];

  return (
    <>
      {/* Fixed Floating Cart */}
      <div className="fixed top-1/2 -translate-y-1/2 right-4 z-50 bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600">🛒</span>
          </div>
          <div className="text-sm text-gray-600 mb-1">0 Items</div>
          <div className="font-bold text-green-600">0 FCFA</div>
        </div>
      </div>

      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Content - Hero Slider (60%) */}
            <div className="lg:col-span-3">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="relative h-96 lg:h-[400px]">
                  <img 
                    src={slides[currentSlide].image}
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                      {slides[currentSlide].title}
                    </h1>
                    <h2 className="text-3xl lg:text-4xl font-bold text-green-400 mb-4">
                      {slides[currentSlide].subtitle}
                    </h2>
                    <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg">
                      {slides[currentSlide].description}
                    </p>
                    <div>
                      <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg">
                        Commencer Maintenant
                      </Button>
                    </div>
                  </div>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {[0, 1, 2, 3].map((index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-green-500' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Coupons (40%) */}
            <div className="lg:col-span-2">
              <div className="bg-orange-50 border-2 border-orange-300 rounded-xl p-6">
                <h3 className="text-lg font-bold text-center mb-6 text-orange-800">
                  Latest Super Discount Active Coupon Code
                </h3>
                
                <div className="space-y-4">
                  {coupons.map((coupon, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={coupon.image}
                          alt={coupon.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-red-500 text-white px-2 py-1 text-xs rounded font-bold">
                              {coupon.discount}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {coupon.status}
                            </span>
                          </div>
                          <h4 className="font-medium text-sm text-gray-800">{coupon.title}</h4>
                        </div>
                        <div className="text-right">
                          <div className="bg-green-100 border border-green-300 px-3 py-1 rounded text-green-700 font-mono text-sm font-bold">
                            {coupon.code}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-1 text-sm mb-3">
                        <span className="bg-red-500 text-white px-2 py-1 rounded min-w-[30px] text-center font-bold">00</span>
                        <span className="text-gray-600">:</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded min-w-[30px] text-center font-bold">00</span>
                        <span className="text-gray-600">:</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded min-w-[30px] text-center font-bold">00</span>
                        <span className="text-gray-600">:</span>
                        <span className="bg-red-500 text-white px-2 py-1 rounded min-w-[30px] text-center font-bold">00</span>
                      </div>
                      
                      <p className="text-xs text-gray-500 text-center">
                        * {coupon.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}