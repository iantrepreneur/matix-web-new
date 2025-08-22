"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Quality Freshness Guaranteed!",
      subtitle: "Intrinsically fashion performance based products rather than accurate benefits...",
      image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const featuredProducts = [
    {
      name: "Poulet Fermier Local",
      price: "25,000",
      originalPrice: "30,000",
      rating: 5,
      image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300",
      discount: "10% Off"
    },
    {
      name: "Poussins Pondeuses",
      price: "2,500",
      rating: 4,
      image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      name: "Cage Élevage Pro",
      price: "85,000",
      originalPrice: "95,000",
      rating: 5,
      image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=300",
      discount: "15% Off"
    },
    {
      name: "Aliment Ponte Premium",
      price: "18,000",
      rating: 4,
      image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=300",
    }
  ];

  const coupons = [
    {
      title: "Summer Gift Voucher",
      discount: "10% Off",
      status: "Inactive",
      code: "SUMMER24",
      image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      title: "Winter Gift Voucher", 
      discount: "$100 Off",
      status: "Inactive",
      code: "WINTER24",
      image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  return (
    <section className="bg-gray-50 py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content - Hero Slider */}
          <div className="lg:col-span-2 relative">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-96 lg:h-[400px]">
                <img 
                  src={slides[currentSlide].image}
                  alt="Hero Background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-12">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-lg">
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg">
                      Shop Now
                    </Button>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2">
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2">
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Coupons */}
          <div className="space-y-6">
            <div className="bg-orange-100 border-2 border-orange-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-center mb-4 text-orange-800">
                Latest Super Discount Active Coupon Code
              </h3>
              
              <div className="space-y-4">
                {coupons.map((coupon, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border">
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
                          <span className="text-xs text-gray-500">{coupon.status}</span>
                        </div>
                        <h4 className="font-medium text-sm">{coupon.title}</h4>
                      </div>
                      <div className="text-right">
                        <div className="bg-green-100 border border-green-300 px-3 py-1 rounded text-green-700 font-mono text-sm">
                          {coupon.code}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <span className="bg-red-500 text-white px-2 py-1 rounded min-w-[30px] text-center">00</span>
                      <span>:</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded min-w-[30px] text-center">00</span>
                      <span>:</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded min-w-[30px] text-center">00</span>
                      <span>:</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded min-w-[30px] text-center">00</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      * This coupon apply when shopping more then $***
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shopping Cart Widget */}
            <div className="bg-green-500 text-white rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🛒</div>
              <div className="text-sm opacity-90 mb-1">0 Items</div>
              <div className="text-xl font-bold">$0.00</div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 bg-orange-100 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-4 lg:mb-0">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                100% Natural Quality Organic Product
              </h2>
              <p className="text-gray-600">
                See Our latest discounted products from here and get a special discount product
              </p>
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}