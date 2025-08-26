"use client";

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';

export default function DiscountedProducts() {
  const discountedProducts = [
    // Row 1
    { id: 16, name: "Poulet Bio Fermier", price: "3,800", originalPrice: "4,500", discount: "-25%", rating: 4.9, image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 17, name: "Poussins Pondeuses", price: "680", originalPrice: "850", discount: "-30%", rating: 4.8, image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 18, name: "Couveuse Automatique", price: "67,500", originalPrice: "89,500", discount: "-25%", rating: 4.7, image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 19, name: "Aliment Démarrage", price: "16,500", originalPrice: "20,000", discount: "-20%", rating: 4.6, image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 20, name: "Cage Élevage", price: "89,000", originalPrice: "125,000", discount: "-30%", rating: 4.5, image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // Row 2
    { id: 21, name: "Vaccins Complets", price: "28,500", originalPrice: "35,000", discount: "-20%", rating: 4.9, image: "https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 22, name: "Abreuvoir Pro 10L", price: "7,200", originalPrice: "9,500", discount: "-25%", rating: 4.7, image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 23, name: "Désinfectant Bio", price: "6,800", originalPrice: "8,500", discount: "-20%", rating: 4.8, image: "https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 24, name: "Œufs Reproducteurs", price: "95", originalPrice: "125", discount: "-25%", rating: 4.6, image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 25, name: "Mangeoire Linéaire", price: "12,500", originalPrice: "15,500", discount: "-20%", rating: 4.4, image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400" },
    
    // Row 3
    { id: 26, name: "Poussins Chair", price: "560", originalPrice: "750", discount: "-30%", rating: 4.8, image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 27, name: "Kit Première Installation", price: "145,000", originalPrice: "190,000", discount: "-25%", rating: 4.7, image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 28, name: "Aliment Finition", price: "17,500", originalPrice: "22,000", discount: "-20%", rating: 4.6, image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 29, name: "Supplément Calcium", price: "4,500", originalPrice: "6,500", discount: "-30%", rating: 4.5, image: "https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 30, name: "Incubateur 50 Œufs", price: "42,000", originalPrice: "56,000", discount: "-25%", rating: 4.3, image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400" }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Derniers Produits en Promotion
          </h2>
          <p className="text-xl text-gray-600">
            Profitez de nos offres spéciales sur une sélection de produits avicoles de qualité
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {discountedProducts.map((product, index) => (
            <Link key={index} href={`/product/${product.id}`}>
              <Card className="relative overflow-hidden hover:shadow-matix-lg transition-all hover:scale-105 cursor-pointer bg-white border-matix-green-pale">
                <div className="absolute top-2 left-2 bg-matix-yellow text-black px-2 py-1 text-xs rounded-md z-10 font-bold">
                  {product.discount}
                </div>
                
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10">{product.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({product.rating})</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="w-full">
                      <span className="font-bold text-matix-green-dark">{product.price} FCFA</span>
                      <div className="flex justify-end mt-2">
                        <Button size="sm" className="bg-matix-button hover:bg-matix-yellow text-black rounded-full w-8 h-8 p-0">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}