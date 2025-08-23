"use client";

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingCart() {
  const { getTotalItems, getTotalPrice, openCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <motion.div
      className="fixed top-1/2 right-5 z-[1000] transform -translate-y-1/2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 cursor-pointer hover:shadow-xl transition-shadow"
        onClick={openCart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-center">
          <div className="relative mb-3">
            <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-green-600" />
            </div>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {totalItems}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="text-sm text-gray-600 mb-1">
            {totalItems} Item{totalItems !== 1 ? 's' : ''}
          </div>
          <div className="font-bold text-green-600">
            {totalPrice.toLocaleString()} FCFA
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}