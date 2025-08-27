"use client";

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import CartSidebar from './CartSidebar';
import ChatBot from './ChatBot';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft1, setTimeLeft1] = useState({ days: 2, hours: 15, minutes: 30, seconds: 45 });
  const [timeLeft2] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const slides = [
    {
      title: "Le Meilleur Hub",
      subtitle: "Numérique Avicole du Sénégal",
      description: "Connecte producteurs, vétérinaires et acheteurs via une plateforme unique mobile-first commandable par la voix en wolof",
      image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft1(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Fixed Floating Cart */}
      <div 
        className="fixed top-1/2 -translate-y-1/2 right-4 z-50 w-20 shadow-lg cursor-pointer hover:scale-105 transition-transform"
        onClick={() => setIsCartOpen(true)}
      >
        <div className="bg-white rounded-t-lg p-3 text-center border-b">
          <div className="w-8 h-8 mx-auto mb-1 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
          </div>
          <div className="text-xs text-gray-600">4 Items</div>
        </div>
        <div className="bg-green-600 rounded-b-lg p-3 text-center">
          <div className="text-sm font-bold text-white">385000 FCFA</div>
        </div>
      </div>

      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Content - Hero Slider (60%) */}
            <div className="lg:col-span-3">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-matix">
                <div className="relative h-96 lg:h-[400px]">
                  <img 
                    src={slides[currentSlide].image}
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-matix-hero opacity-80"></div>
                  
                  <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                      {slides[currentSlide].title}
                    </h1>
                    <h2 className="text-3xl lg:text-4xl font-bold text-matix-yellow mb-4">
                      {slides[currentSlide].subtitle}
                    </h2>
                    <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg">
                      {slides[currentSlide].description}
                    </p>
                    <div>
                      <Button className="bg-matix-button hover:bg-matix-yellow text-black px-8 py-3 rounded-lg text-lg font-semibold transition-all">
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
                          index === 0 ? 'bg-matix-yellow' : 'bg-white/50'
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
              <div className="bg-matix-green-pale border-4 border-matix-yellow rounded-xl p-6 relative">
                <h3 className="text-lg font-bold text-center mb-6 text-matix-green-dark">
                  Derniers Codes de Réduction Super Actifs
                </h3>
                
                <div className="space-y-6">
                  {/* COUPON 1 - ACTIF */}
                  <div className="bg-white rounded-lg p-4 shadow-matix relative">
                    <div className="grid grid-cols-12 gap-3 items-center">
                      {/* Image produit */}
                      <div className="col-span-3">
                        <img 
                          src="https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=120"
                          alt="Poulets fermiers"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      
                      {/* Section centrale */}
                      <div className="col-span-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-matix-yellow text-black px-3 py-1 text-sm rounded-full font-bold">
                            25% Off
                          </span>
                          <span className="bg-matix-green-light text-white px-3 py-1 text-xs rounded-full">
                            Active
                          </span>
                        </div>
                        <h4 className="font-semibold text-matix-green-dark mb-3">Promo Ramadan</h4>
                        
                        {/* Compteur dégressif */}
                        <div className="flex items-center gap-1">
                          <div className="bg-matix-green-light text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
                            {String(timeLeft1.days).padStart(2, '0')}
                          </div>
                          <span className="text-matix-green-medium font-bold">:</span>
                          <div className="bg-matix-green-light text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
                            {String(timeLeft1.hours).padStart(2, '0')}
                          </div>
                          <span className="text-matix-green-medium font-bold">:</span>
                          <div className="bg-matix-green-light text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
                            {String(timeLeft1.minutes).padStart(2, '0')}
                          </div>
                          <span className="text-matix-green-medium font-bold">:</span>
                          <div className="bg-matix-green-light text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
                            {String(timeLeft1.seconds).padStart(2, '0')}
                          </div>
                        </div>
                      </div>
                      
                      {/* Code section */}
                      <div className="col-span-3 text-right">
                        <div className="border-2 border-dashed border-matix-yellow bg-matix-yellow/20 px-3 py-2 rounded-lg mb-2">
                          <span className="text-matix-green-dark font-mono text-sm font-bold">RAMADAN25</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          * Ce coupon s'applique pour des achats de plus de 50000 FCFA
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* COUPON 2 - INACTIF */}
                  <div className="bg-white rounded-lg p-4 shadow-matix relative opacity-75">
                    <div className="grid grid-cols-12 gap-3 items-center">
                      {/* Image produit */}
                      <div className="col-span-3">
                        <img 
                          src="https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=120"
                          alt="Équipement avicole"
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      
                      {/* Section centrale */}
                      <div className="col-span-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-matix-yellow text-black px-3 py-1 text-sm rounded-full font-bold">
                            5000 FCFA Off
                          </span>
                          <span className="bg-gray-400 text-white px-3 py-1 text-xs rounded-full">
                            Inactive
                          </span>
                        </div>
                        <h4 className="font-semibold text-matix-green-dark mb-3">Nouveau Client</h4>
                        
                        {/* Compteur expiré */}
                        <div className="flex items-center gap-1">
                          <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
                            00
                          </div>
                          <span className="text-gray-600 font-bold">:</span>
                          <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
                            00
                          </div>
                          <span className="text-gray-600 font-bold">:</span>
                          <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
                            00
                          </div>
                          <span className="text-gray-600 font-bold">:</span>
                          <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-[32px] text-center">
                            00
                          </div>
                        </div>
                      </div>
                      
                      {/* Code section */}
                      <div className="col-span-3 text-right">
                        <div className="border-2 border-dashed border-matix-yellow bg-matix-yellow/20 px-3 py-2 rounded-lg mb-2">
                          <span className="text-matix-green-dark font-mono text-sm font-bold">KORITE50</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          * Ce coupon s'applique pour des achats de plus de 25000 FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* ChatBot Widget */}
      <ChatBot />
    </>
  );
}