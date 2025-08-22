"use client";

import { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Promotional Banner */}
      <div className="bg-green-600 text-white text-center py-2 text-sm">
        <p>🎉 Livraison gratuite pour les commandes de plus de 50 000 FCFA dans le Grand Dakar</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-green-600">MATIX</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Catégories</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Producteurs</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Vétérinaires</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Transporteurs</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Pages</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Rechercher des produits avicoles..."
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Mic className="h-4 w-4 text-green-600" />
                </Button>
                <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher des produits avicoles..."
              className="pr-16"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Mic className="h-4 w-4 text-green-600" />
              </Button>
              <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t pt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Catégories</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Producteurs</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Vétérinaires</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Transporteurs</a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium">Pages</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}