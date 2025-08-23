"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  discount?: string;
  image: string;
  producer: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  
  const cartItem = items.find(item => item.id === product.id);
  const priceNumber = parseInt(product.price.replace(/,/g, ''));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: priceNumber,
      image: product.image,
      producer: product.producer
    });
    
    setShowAddAnimation(true);
    setTimeout(() => setShowAddAnimation(false), 1000);
  };

  const handleQuantityChange = (e: React.MouseEvent, newQuantity: number) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, newQuantity);
  };

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all hover:scale-105 cursor-pointer group">
      <Link href={`/product/${product.id}`}>
        {product.discount && (
          <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 text-xs rounded-md z-10">
            {product.discount}
          </div>
        )}
        
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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
            <span className="font-bold text-green-600">{product.price} FCFA</span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="absolute bottom-4 right-4">
        <AnimatePresence mode="wait">
          {!cartItem ? (
            <motion.div
              key="add-button"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 w-10 h-10 p-0 rounded-full shadow-lg"
                onClick={handleAddToCart}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="quantity-controls"
              className="bg-green-600 rounded-full flex items-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Button
                size="sm"
                variant="ghost"
                className="h-10 w-10 p-0 rounded-full text-white hover:bg-green-700"
                onClick={(e) => handleQuantityChange(e, cartItem.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-white font-bold px-3 min-w-[2rem] text-center">
                {cartItem.quantity}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-10 w-10 p-0 rounded-full text-white hover:bg-green-700"
                onClick={(e) => handleQuantityChange(e, cartItem.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add Animation */}
      <AnimatePresence>
        {showAddAnimation && (
          <motion.div
            className="absolute inset-0 bg-green-600 bg-opacity-90 flex items-center justify-center rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-white text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Ajouté au panier!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}