"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  Package, 
  Star, 
  User as UserIcon, 
  Edit, 
  Lock, 
  LogOut,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  CheckCircle,
  DollarSign,
  Upload,
  Award,
  FileText,
  Shield,
  TrendingUp
} from 'lucide-react';

export default function MyAccountPage() {
  const [activePage, setActivePage] = useState('account');

  const user = {
    name: "Amadou Diallo",
    email: "amadou@gmail.com",
    phone: "+221 77 123 4567",
    address: "Marché Colobane, Dakar",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100",
    // Informations spécifiques producteur
    typeElevage: "Aviculture mixte (chair + ponte)",
    licence: "AV-2024-DK-001245",
    superficie: "2 hectares",
    capacite: "500 têtes",
    certificationBio: true,
    // Statistiques producteur
    memberSince: "Janvier 2024",
    totalSales: 89,
    revenue: "1,847,000",
    rating: 4.8,
    reviews: 23
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'products', label: 'Mes Produits', icon: <Package className="h-4 w-4" /> },
    { id: 'orders', label: 'Commandes Reçues', icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'stats', label: 'Statistiques', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'location', label: 'Géolocalisation', icon: <MapPin className="h-4 w-4" /> },
    { id: 'account', label: 'Mon Profil', icon: <UserIcon className="h-4 w-4" /> },
    { id: 'logout', label: 'Déconnexion', icon: <LogOut className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header identique */}
      <div className="bg-gray-100 text-gray-700 text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">📞</span>
            <span>Nous sommes disponibles 24h/7j, Besoin d'aide ?</span>
            <span className="text-green-600 font-semibold">+221 77 123 45 67</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-green-600">À Propos</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600">Nous Contacter</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600">Mon Compte</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600 flex items-center gap-1">
              🔒 Déconnexion
            </a>
          </div>
        </div>
      </div>

      <div className="bg-matix-green-dark text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="bg-white text-matix-green-dark p-2 rounded-lg mr-3">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-matix-yellow">MATIX</h1>
                <p className="text-xs text-matix-yellow opacity-90">M A R T</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-matix-green-medium font-medium">Accueil</Link>
            <Link href="/categories" className="text-gray-700 hover:text-matix-green-medium font-medium">Catégories</Link>
            <Link href="#" className="text-gray-700 hover:text-matix-green-medium font-medium">À Propos</Link>
            <Link href="#" className="text-gray-700 hover:text-matix-green-medium font-medium">Contact</Link>
            <Link href="/offres" className="text-matix-yellow font-medium">Offres</Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {/* Profile Section */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              {/* Menu Navigation */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.id === 'dashboard' ? '/dashboard' : `/dashboard/${item.id}`}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activePage === item.id 
                        ? 'bg-matix-green-pale text-matix-green-dark font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-matix-green-medium'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Mon Compte</h1>
            </div>

            {/* Profile Information */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Informations Générales</h2>
              
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Nom complet</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Adresse</p>
                        <p className="font-medium">{user.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Type d'élevage</p>
                        <p className="font-medium">{user.typeElevage}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Licence/Autorisation</p>
                        <p className="font-medium">{user.licence}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Superficie</p>
                        <p className="font-medium">{user.superficie}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Capacité d'élevage</p>
                        <p className="font-medium">{user.capacite}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Certification Bio</p>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.certificationBio ? 'Oui' : 'Non'}</span>
                          <div className={`w-3 h-3 rounded-full ${user.certificationBio ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Informations Spécifiques Producteur */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Informations Producteur</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Type d'élevage</p>
                      <p className="font-medium">{user.typeElevage}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Licence/Autorisation</p>
                      <p className="font-medium">{user.licence}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Superficie</p>
                      <p className="font-medium">{user.superficie}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Capacité d'élevage</p>
                      <p className="font-medium">{user.capacite}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Certification Bio */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Certification Bio</p>
                      <p className="text-sm text-gray-500">Produits certifiés biologiques</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${user.certificationBio ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            </Card>

            {/* Statistics */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Statistiques de Vente</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Membre depuis</p>
                  <p className="font-bold text-lg">{user.memberSince}</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500 mb-1">Total ventes</p>
                  <p className="font-bold text-lg">{user.totalSales} commandes</p>
                </div>
                
                 <div className="text-center">
                   <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                     <DollarSign className="h-6 w-6 text-purple-600" />
                   </div>
                   <p className="text-sm text-gray-500 mb-1">CA généré</p>
                   <p className="font-bold text-lg">{user.revenue} FCFA</p>
                </div>
                
                 <div className="text-center">
                   <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                     <Star className="h-6 w-6 text-yellow-600" />
                   </div>
                   <p className="text-sm text-gray-500 mb-1">Note moyenne</p>
                   <p className="font-bold text-lg">{user.rating}/5 ({user.reviews} avis)</p>
                </div>
              </div>
            </Card>

            {/* Documents */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-6">Documents & Certifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Licence d'élevage</p>
                      <p className="text-sm text-gray-500">Document officiel requis</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Certificat vétérinaire</p>
                      <p className="text-sm text-gray-500">Contrôle sanitaire</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Assurance exploitation</p>
                      <p className="text-sm text-gray-500">Couverture responsabilité</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Actions Rapides</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/dashboard/profile">
                  <Button className="w-full bg-matix-green-medium hover:bg-matix-green-dark text-white flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Modifier Profil
                  </Button>
                </Link>
                
                <Link href="/dashboard/products">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Gérer Produits
                  </Button>
                </Link>
                
                <Link href="/dashboard/stats">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Voir Statistiques
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Section App */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Obtenez Vos Besoins Quotidiens Depuis Notre Boutique Matix
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Il y a de nombreux produits que vous trouverez dans notre boutique. 
                Choisissez votre produit nécessaire quotidien dans notre boutique Matix 
                et obtenez des offres spéciales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6" />
                  Google Play
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-6" />
                  App Store
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl">🛒</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Livraison Gratuite</div>
                <div className="text-sm text-gray-500">À partir de 50,000 FCFA</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Support 24/7</div>
                <div className="text-sm text-gray-500">À tout moment</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Paiement Sécurisé</div>
                <div className="text-sm text-gray-500">100% Sécurisé</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Dernières Offres</div>
                <div className="text-sm text-gray-500">Jusqu'à 25% de réduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-matix-footer-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <h3 className="text-xl font-bold text-matix-yellow mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">À Propos Matix</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dernières Nouvelles</a></li>
              </ul>
            </div>

            {/* Latest News */}
            <div>
              <h3 className="text-xl font-bold text-matix-yellow mb-6">Latest News</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Volailles & Viande</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Aliments Avicoles</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Équipements</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Santé & Vétérinaire</a></li>
              </ul>
            </div>

            {/* My Account */}
            <div>
              <h3 className="text-xl font-bold text-matix-yellow mb-6">My Account</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mes Commandes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Commandes Récentes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mettre à Jour Profil</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white text-matix-green-dark p-2 rounded-lg">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-matix-yellow">MATIX MART</h1>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Marché Colobane, Dakar, Sénégal
              </p>
              <p className="text-gray-300 mb-2">Tél : +221 77 123 45 67</p>
              <p className="text-gray-300">Email : contact@matix.sn</p>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Suivez-nous:</span>
                <div className="flex gap-3">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <span className="text-white text-sm">f</span>
                  </div>
                  <div className="bg-black p-2 rounded-full">
                    <span className="text-white text-sm">X</span>
                  </div>
                  <div className="bg-red-500 p-2 rounded-full">
                    <span className="text-white text-sm">P</span>
                  </div>
                  <div className="bg-blue-700 p-2 rounded-full">
                    <span className="text-white text-sm">in</span>
                  </div>
                  <div className="bg-green-500 p-2 rounded-full">
                    <span className="text-white text-sm">W</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-400">
                  Appelez-nous: <span className="text-matix-yellow font-bold text-xl">+221771234567</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Orange Money</div>
                <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Wave</div>
              </div>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-800">
              <p className="text-gray-400">
                Copyright 2024 © <span className="text-matix-yellow">MatixLover</span>. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}