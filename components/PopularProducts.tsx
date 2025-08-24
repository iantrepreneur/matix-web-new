"use client";

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';

export default function PopularProducts() {
  const products = [
    // Row 1
    { id: 1, name: "Poulet Fermier Bio", price: "4,500", rating: 4.8, discount: "-15%", image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Ferme Moussa Ba" },
    { id: 2, name: "Poussins ISA Brown", price: "850", rating: 4.9, image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Élevage Fatou Diop" },
    { id: 3, name: "Cage 20 Poules", price: "125,000", rating: 4.7, discount: "-20%", image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Équipements Modou Fall" },
    { id: 4, name: "Couveuse 100 Œufs", price: "89,500", rating: 4.6, image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Tech Avicole SA" },
    { id: 5, name: "Aliment Ponte", price: "18,500", rating: 4.8, image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "NMA Nutrition" },
    
    // Row 2
    { id: 6, name: "Mangeoire Automatique", price: "15,500", rating: 4.5, image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Solutions Avicoles" },
    { id: 7, name: "Abreuvoir 5L", price: "3,200", rating: 4.7, discount: "-10%", image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Hydro Poultry" },
    { id: 8, name: "Vaccin Newcastle", price: "12,500", rating: 4.9, image: "https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "VetSen Laboratoire" },
    { id: 9, name: "Désinfectant 5L", price: "8,500", rating: 4.6, image: "https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "BioClean Sénégal" },
    { id: 10, name: "Œufs à Couver", price: "125", rating: 4.8, image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Couvoir Premium" },
    
    // Row 3
    { id: 11, name: "Poussin Chair Ross", price: "750", rating: 4.7, discount: "-25%", image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Genetics Sénégal" },
    { id: 12, name: "Cage Transport", price: "45,000", rating: 4.4, image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Transport Solutions" },
    { id: 13, name: "Aliment Chair", price: "19,500", rating: 4.8, image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "Nutrition Plus" },
    { id: 14, name: "Vitamines AD3E", price: "6,500", rating: 4.6, image: "https://images.pexels.com/photos/3786215/pexels-photo-3786215.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "PharmAvic" },
    { id: 15, name: "Thermomètre Digital", price: "12,500", rating: 4.5, image: "https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=400", producer: "MesureMax" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Produits Populaires pour l'Élevage Quotidien
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez nos produits les plus demandés par les éleveurs sénégalais
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <Link key={index} href={`/product/${product.id}`}>
              <Card className="relative overflow-hidden hover:shadow-matix-lg transition-all hover:scale-105 cursor-pointer bg-white border-matix-green-pale">
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-matix-yellow text-black px-2 py-1 text-xs rounded-md z-10 font-bold">
                    {product.discount}
                  </div>
                )}
                
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.producer}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({product.rating})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-matix-green-dark">{product.price} FCFA</span>
                    <Button size="sm" className="bg-matix-button hover:bg-matix-yellow text-black p-2 transition-all">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
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