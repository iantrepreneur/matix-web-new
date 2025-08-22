"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    name: "Poulet Fermier Bio Premium",
    price: "4,500",
    originalPrice: "5,200",
    rating: 4.8,
    reviews: 127,
    discount: "-15%",
    producer: "Ferme Moussa Ba",
    location: "Thiès, Sénégal",
    images: [
      "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=600"
    ],
    description: "Poulet fermier élevé en plein air selon les méthodes traditionnelles sénégalaises. Nourri avec des aliments naturels sans OGM, ce poulet offre une chair tendre et savoureuse. Élevage respectueux du bien-être animal dans la région de Thiès.",
    specifications: [
      { label: "Poids moyen", value: "1.8 - 2.2 kg" },
      { label: "Âge d'abattage", value: "12-14 semaines" },
      { label: "Alimentation", value: "100% naturelle" },
      { label: "Élevage", value: "Plein air" },
      { label: "Certification", value: "Bio Sénégal" }
    ]
  };

  const similarProducts = [
    { name: "Poulet Chair Standard", price: "3,200", image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300", rating: 4.5 },
    { name: "Poule Pondeuse", price: "6,500", image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=300", rating: 4.7 },
    { name: "Coq Reproducteur", price: "8,500", image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=300", rating: 4.6 },
    { name: "Poulet Bicyclette", price: "5,800", image: "https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=300", rating: 4.9 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          <nav className="text-sm text-gray-600">
            <span>Accueil</span> / <span>Volailles</span> / <span className="text-green-600">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${product.name} ${index + 1}`}
                  className={`h-20 object-cover rounded cursor-pointer border-2 ${
                    selectedImage === index ? 'border-green-600' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">Par {product.producer} • {product.location}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 text-gray-600">({product.reviews} avis)</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-green-600">{product.price} FCFA</span>
                <span className="text-xl text-gray-400 line-through">{product.originalPrice} FCFA</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">{product.discount}</span>
              </div>
              <p className="text-green-600 font-medium">✓ En stock - Livraison sous 24h</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantité</label>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 border rounded">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Ajouter au Panier
              </Button>
              <Button variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Specifications */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Caractéristiques</h3>
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{spec.label}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="border-b">
            <div className="flex gap-8">
              <button 
                className={`pb-4 px-2 ${activeTab === 'description' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`pb-4 px-2 ${activeTab === 'reviews' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Avis ({product.reviews})
              </button>
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Description du produit</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Avis clients</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="font-medium">Amadou Diallo</span>
                      <span className="text-gray-500 text-sm">il y a 2 jours</span>
                    </div>
                    <p className="text-gray-700">Excellent poulet, très tendre et savoureux. Livraison rapide et produit frais.</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </div>
                      <span className="font-medium">Fatou Sow</span>
                      <span className="text-gray-500 text-sm">il y a 1 semaine</span>
                    </div>
                    <p className="text-gray-700">Bonne qualité, conforme à la description. Je recommande ce producteur.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Produits similaires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{product.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-600">{product.price} FCFA</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}