"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, User as UserIcon, Menu, X, Mic, Bell, ChevronDown, BarChart3, Package, Edit, Lock, TrendingUp, Store, Users, FileText, DollarSign, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CartSidebar from './CartSidebar';
import AuthModal from './AuthModal';
import { authService, User as UserType } from '@/lib/auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    // Redirection après connexion selon le profil
    if (user.profile === 'producteur') {
      window.location.href = '/dashboard';
    } else if (user.profile === 'distributeur') {
      window.location.href = '/dashboard/distributor';
    } else if (user.profile === 'client') {
      window.location.href = '/dashboard/client';
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsProfileDropdownOpen(false);
    window.location.href = '/';
  };

  const getProfileColor = (profile: string) => {
    switch (profile) {
      case 'producteur': return 'text-green-600';
      case 'distributeur': return 'text-blue-600';
      case 'client': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getProfileLabel = (profile: string) => {
    switch (profile) {
      case 'producteur': return 'Producteur';
      case 'distributeur': return 'Distributeur';
      case 'client': return 'Client';
      default: return '';
    }
  };

  // Navigation selon le profil
  const getNavigationItems = () => {
    if (!currentUser) {
      return [
        { href: '/categories', label: 'Catégories' },
        { href: '/marques', label: 'Marques Distributeurs' },
        { href: '/offres', label: 'Offres', isSpecial: true }
      ];
    }

    switch (currentUser.profile) {
      case 'producteur':
        return [
          { href: '/', label: 'Accueil' },
          { href: '/dashboard/products', label: 'Mes Produits' },
          { href: '/dashboard/orders', label: 'Commandes' },
          { href: '/dashboard/stats', label: 'Statistiques' }
        ];
      case 'distributeur':
        return [
          { href: '/', label: 'Accueil' },
          { href: '/dashboard/distributor/search', label: 'Producteurs' },
          { href: '/dashboard/distributor/clients', label: 'Clients' },
          { href: '/dashboard/distributor/brand', label: 'Ma Marque' },
          { href: '/dashboard/distributor/alerts', label: 'Alertes' }
        ];
      case 'client':
        return [
          { href: '/', label: 'Accueil' },
          { href: '/categories', label: 'Catégories' },
          { href: '/dashboard/client/orders', label: 'Mes Commandes' },
          { href: '/dashboard/client/requests', label: 'Demandes' },
          { href: '/dashboard/client/favorites', label: 'Favoris' }
        ];
      default:
        return [];
    }
  };

  // Menu dropdown selon le profil
  const getProfileMenuItems = () => {
    if (!currentUser) return [];

    switch (currentUser.profile) {
      case 'producteur':
        return [
          { href: '/dashboard', icon: <BarChart3 className="h-4 w-4" />, label: 'Dashboard' },
          { href: '/dashboard/products', icon: <Package className="h-4 w-4" />, label: 'Gérer mes produits' },
          { href: '/dashboard/stats', icon: <TrendingUp className="h-4 w-4" />, label: 'Voir statistiques' },
          { href: '/dashboard/account', icon: <UserIcon className="h-4 w-4" />, label: 'Mon profil' },
          { href: '/dashboard/stats', icon: <DollarSign className="h-4 w-4" />, label: 'Mes revenus' }
        ];
      case 'distributeur':
        return [
          { href: '/dashboard/distributor', icon: <BarChart3 className="h-4 w-4" />, label: 'Dashboard' },
          { href: '/dashboard/distributor/search', icon: <Search className="h-4 w-4" />, label: 'Chercher producteurs' },
          { href: '/dashboard/distributor/brand', icon: <Store className="h-4 w-4" />, label: 'Ma boutique' },
          { href: '/dashboard/distributor/alerts', icon: <Bell className="h-4 w-4" />, label: 'Mes alertes' },
          { href: '/dashboard/distributor/profile', icon: <UserIcon className="h-4 w-4" />, label: 'Mon profil' }
        ];
      case 'client':
        return [
          { href: '/dashboard/client', icon: <Home className="h-4 w-4" />, label: 'Mon compte' },
          { href: '/dashboard/client/orders', icon: <Package className="h-4 w-4" />, label: 'Mes commandes' },
          { href: '/dashboard/client/requests', icon: <FileText className="h-4 w-4" />, label: 'Mes demandes' },
          { href: '/dashboard/client/favorites', icon: <Heart className="h-4 w-4" />, label: 'Mes favoris' },
          { href: '/dashboard/client/profile', icon: <UserIcon className="h-4 w-4" />, label: 'Mon profil' }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();
  const profileMenuItems = getProfileMenuItems();

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
              <Link href="/" className="flex items-center">
                <div className="bg-white text-matix-green-dark p-2 rounded-lg mr-3">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-matix-yellow">MATIX</h1>
                  <p className="text-xs text-matix-yellow opacity-90">M A R T</p>
                </div>
              </Link>

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
                {currentUser ? (
                  <div className="relative">
                    <div 
                      className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer"
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    >
                      <img 
                        src={currentUser.avatar} 
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Profile Dropdown */}
                    {isProfileDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-gray-900">{currentUser.name}</p>
                          <p className={`text-xs ${getProfileColor(currentUser.profile)}`}>
                            {getProfileLabel(currentUser.profile)}
                          </p>
                        </div>
                        {profileMenuItems.map((item, index) => (
                          <Link 
                            key={index}
                            href={item.href} 
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors" 
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                          </Link>
                        ))}
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <UserIcon className="h-4 w-4" />
                          <span className="text-sm">Déconnexion</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-matix-yellow hover:bg-matix-green-medium transition-colors"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Se connecter
                  </Button>
                )}

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
                {navigationItems.map((item, index) => (
                  <div key={index}>
                    {item.isSpecial ? (
                      <div className="relative">
                        <Link href={item.href} className="text-black bg-matix-yellow hover:bg-yellow-500 px-3 py-1 rounded-full text-sm font-medium transition-colors">
                          {item.label}
                        </Link>
                        <span className="absolute -top-1 -right-1 bg-matix-yellow w-2 h-2 rounded-full animate-pulse-yellow"></span>
                      </div>
                    ) : item.label === 'Catégories' ? (
                      <Link href={item.href} className="flex items-center gap-1 text-gray-700 hover:text-matix-green-medium cursor-pointer font-medium transition-colors">
                        <span>{item.label}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Link>
                    ) : (
                      <Link href={item.href} className="text-gray-700 hover:text-matix-green-medium font-medium transition-colors">
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
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
                    {navigationItems.map((item, index) => (
                      <Link 
                        key={index}
                        href={item.href} 
                        className={`font-medium transition-colors ${
                          item.isSpecial 
                            ? 'text-matix-yellow hover:text-yellow-600' 
                            : 'text-gray-700 hover:text-matix-green-medium'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}