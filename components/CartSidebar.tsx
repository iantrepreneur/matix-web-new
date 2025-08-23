"use client";

import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-[1001]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-white z-[1002] shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-gray-700" />
                  <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeCart}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    <div className="text-6xl mb-4 opacity-50">🛒</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
                    <p className="text-gray-500 text-center mb-6">
                      Ajoutez des produits avicoles pour commencer vos achats
                    </p>
                    <Button onClick={closeCart} className="bg-green-600 hover:bg-green-700">
                      Continuer les achats
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ duration: 0.2 }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-gray-900 mb-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">{item.producer}</p>
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xs text-gray-400 line-through">
                                  Prix unitaire {item.price.toLocaleString()}
                                </span>
                                <div className="font-bold text-green-600">
                                  {(item.price * item.quantity).toLocaleString()} FCFA
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Subtotal</span>
                    <span className="text-lg font-bold text-green-600">
                      {totalPrice.toLocaleString()} FCFA
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={closeCart}
                    >
                      View Cart
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Checkout
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}