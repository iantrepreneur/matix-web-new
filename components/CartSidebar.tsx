"use client";

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Poulet Fermier Bio",
      price: 4500,
      quantity: 1,
      image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=120"
    },
    {
      id: 2,
      name: "Poussins ISA Brown",
      price: 850,
      quantity: 2,
      image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=120"
    },
    {
      id: 3,
      name: "Aliment Ponte Premium",
      price: 18500,
      quantity: 1,
      image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=120"
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <React.Fragment>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Panier d'Achats</h2>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="text-sm">Fermer</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
              <p className="text-gray-500 mb-6">Ajoutez des produits pour commencer vos achats</p>
              <Button onClick={onClose} className="bg-matix-button hover:bg-matix-yellow text-black font-semibold transition-all">
                Continuer les Achats
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-15 h-15 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      Prix Unitaire {item.price.toLocaleString()} FCFA
                    </p>
                    <p className="font-bold text-matix-green-dark text-lg">
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3 text-gray-600" />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-900">Sous-total</span>
              <span className="font-bold text-xl text-gray-900">
                {subtotal.toLocaleString()} FCFA
              </span>
            </div>
            
            <p className="text-xs text-gray-500 mb-4">
              Frais de livraison et taxes calculés lors du paiement.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                variant="outline" 
               className="w-full border-matix-green-medium text-matix-green-medium hover:bg-matix-green-pale transition-colors"
                onClick={onClose}
              >
                Voir le Panier
              </Button>
             <Button className="w-full bg-matix-button hover:bg-matix-yellow text-black font-semibold transition-all">
                <Link href="/checkout" className="w-full">
                  Commander
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}