"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, ShoppingCart } from 'lucide-react';

export default function HeroSection() {
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

  return (
    <section className="bg-gray-50 py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left Content - 60% */}
          <div className="lg:col-span-3 relative">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20 rounded-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Poultry Farm Background"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative z-10 py-12 lg:py-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Le Meilleur Hub Numérique
                <br />
                <span className="text-green-600">Avicole du Sénégal</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Plateforme mobile-first commandable par la voix en wolof connectant producteurs, vétérinaires et acheteurs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg">
                  Commencer
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50">
                  Assistant Vocal
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - 40% Product Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.map((product, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden cursor-pointer">
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md z-10">
                      {product.discount}
                    </div>
                  )}
                  <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-500">{product.price} FCFA</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-xs py-2 rounded-md">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Ajouter au Panier
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}