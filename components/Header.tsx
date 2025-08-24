"use client";

import { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X, Mic, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CartSidebar from './CartSidebar';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-50">
        {/* Top Bar - Gris clair */}
        <div className="bg-matix-green-pale text-matix-green-dark text-sm py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-matix-green-medium">📞</span>
              <span>Nous sommes disponibles 24h/7j, Besoin d'aide ?</span>
              <span className="text-matix-yellow font-semibold">+221 77 123 45 67</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-sm">
              <a href="#" className="hover:text-matix-yellow transition-colors">À Propos</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-matix-yellow transition-colors">Nous Contacter</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-matix-yellow transition-colors">Mon Compte</a>
              <span className="text-gray-400">|</span>
              <a href="#" className="hover:text-matix-yellow transition-colors flex items-center gap-1">
                🔒 Déconnexion
              </a>
            </div>
          </div>
        </div>

        {/* Main Header - Vert */}
        <div className="bg-matix-green-dark text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div className="bg-white text-matix-green-dark p-2 rounded-lg mr-3">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-matix-yellow">MATIX</h1>
                  <p className="text-xs text-matix-yellow opacity-90">M A R T</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Rechercher des produits (ex: poulet, aliment)"
                    className="w-full bg-white text-gray-900 border-0 rounded-lg pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-matix-yellow"
                  />
                  <Button 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-matix-button hover:bg-matix-yellow text-black rounded-md px-3 transition-all"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                {/* Cart */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative text-matix-yellow hover:bg-matix-green-medium p-2 transition-colors"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-matix-yellow text-black rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold animate-pulse-yellow">
                    2
                  </span>
                </Button>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="text-matix-yellow hover:bg-matix-green-medium p-2 transition-colors">
                  <Bell className="h-6 w-6" />
                </Button>

                {/* User Profile */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-matix-yellow hover:bg-matix-green-medium transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden mt-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Rechercher des produits..."
                  className="w-full bg-white text-gray-900 border-0 rounded-lg pl-4 pr-12 py-3 focus:ring-2 focus:ring-matix-yellow"
                />
                <Button 
                  size="sm" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-matix-button hover:bg-matix-yellow text-black rounded-md px-3 transition-all"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Blanc */}
        <div className="bg-white border-b border-gray-200 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              {/* Left Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                <div className="flex items-center gap-1 text-gray-700 hover:text-matix-green-medium cursor-pointer font-medium transition-colors">
                  <span>Catégories</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <a href="#" className="text-gray-700 hover:text-matix-green-medium font-medium transition-colors">À Propos</a>
                <a href="#" className="text-gray-700 hover:text-matix-green-medium font-medium transition-colors">Contact</a>
                <div className="flex items-center gap-1 text-gray-700 hover:text-matix-green-medium cursor-pointer font-medium transition-colors">
                  <span>Pages</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="relative">
                  <a href="/offres" className="text-black bg-matix-yellow hover:bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium transition-colors">
                    Offres
                  </a>
                  <span className="absolute -top-1 -right-1 bg-matix-yellow w-2 h-2 rounded-full animate-pulse-yellow"></span>
                </div>
              </nav>

              {/* Right Navigation */}
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <div className="flex items-center gap-2">
                  <img src="https://flagcdn.com/w20/sn.png" alt="Français" className="w-4 h-4" />
                  <span className="text-matix-green-dark">Français</span>
                </div>
                <a href="#" className="text-gray-700 hover:text-matix-green-medium transition-colors">Politique de Confidentialité</a>
                <a href="#" className="text-gray-700 hover:text-matix-green-medium transition-colors">Conditions Générales</a>
              </div>

              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-matix-green-pale py-4 px-4 shadow-matix">
                  <nav className="flex flex-col space-y-4">
                    <a href="#" className="text-gray-700 hover:text-matix-green-medium font-medium transition-colors">Catégories</a>
                    <a href="#" className="text-gray-700 hover:text-matix-green-medium font-medium transition-colors">À Propos</a>
                    <a href="#" className="text-gray-700 hover:text-matix-green-medium font-medium transition-colors">Contact</a>
                    <a href="#" className="text-gray-700 hover:text-matix-green-medium font-medium transition-colors">Pages</a>
                    <a href="#" className="text-matix-yellow hover:text-yellow-600 font-medium transition-colors">Offres</a>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}