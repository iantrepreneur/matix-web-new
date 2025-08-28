"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Plus,
  Minus,
  ShoppingCart,
  Clock,
  Truck
} from 'lucide-react';

export default function LocationPage() {
  const [activePage, setActivePage] = useState('location');
  const [deliveryRadius, setDeliveryRadius] = useState(25);
  const [costPerKm, setCostPerKm] = useState(200);
  const [farmAddress, setFarmAddress] = useState("Route de Rufisque, Sangalkam, Dakar");
  const [selectedDays, setSelectedDays] = useState(['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(['8h-12h', '14h-18h']);

  const user = {
    name: "Amadou Diallo",
    email: "amadou@gmail.com",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'products', label: 'Mes Produits', icon: <Package className="h-4 w-4" /> },
    { id: 'orders', label: 'Commandes Reçues', icon: <ShoppingCart className="h-4 w-4" /> },
    { id: 'stats', label: 'Statistiques', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'location', label: 'Géolocalisation', icon: <MapPin className="h-4 w-4" /> },
    { id: 'profile', label: 'Mon Profil', icon: <UserIcon className="h-4 w-4" /> },
    { id: 'logout', label: 'Déconnexion', icon: <LogOut className="h-4 w-4" /> }
  ];

  const days = [
    { id: 'lundi', label: 'Lundi' },
    { id: 'mardi', label: 'Mardi' },
    { id: 'mercredi', label: 'Mercredi' },
    { id: 'jeudi', label: 'Jeudi' },
    { id: 'vendredi', label: 'Vendredi' },
    { id: 'samedi', label: 'Samedi' },
    { id: 'dimanche', label: 'Dimanche' }
  ];

  const timeSlots = [
    { id: '8h-12h', label: '8h - 12h' },
    { id: '14h-18h', label: '14h - 18h' },
    { id: '18h-20h', label: '18h - 20h' }
  ];

  // Zones calculées automatiquement selon le rayon
  const coveredZones = [
    { name: "Dakar Centre", distance: 15, cost: 15 * costPerKm },
    { name: "Pikine", distance: 18, cost: 18 * costPerKm },
    { name: "Rufisque", distance: 8, cost: 8 * costPerKm },
    { name: "Guédiawaye", distance: 22, cost: 22 * costPerKm },
    { name: "Parcelles Assainies", distance: 20, cost: 20 * costPerKm },
    { name: "Thiaroye", distance: 12, cost: 12 * costPerKm }
  ].filter(zone => zone.distance <= deliveryRadius);

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const toggleTimeSlot = (slotId: string) => {
    setSelectedTimeSlots(prev => 
      prev.includes(slotId) 
        ? prev.filter(s => s !== slotId)
        : [...prev, slotId]
    );
  };

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
                <p className="text-xs text-green-600">Producteur</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Géolocalisation & Zone de Livraison</h1>
            </div>

            {/* Section Adresse Ferme */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Ma ferme est située à:</h2>
              <div className="flex gap-4">
                <Input
                  value={farmAddress}
                  onChange={(e) => setFarmAddress(e.target.value)}
                  className="flex-1"
                  placeholder="Adresse de votre ferme"
                />
                <Button className="bg-matix-green-medium hover:bg-matix-green-dark text-white flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Localiser sur carte
                </Button>
              </div>
            </Card>

            {/* Carte Interactive Mockée */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Carte Interactive</h2>
              <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-80 overflow-hidden">
                {/* Simulation Google Maps */}
                <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
                
                {/* Pin de localisation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium whitespace-nowrap">
                      Ferme Amadou Diallo
                    </div>
                  </div>
                </div>

                {/* Cercle de livraison */}
                <div 
                  className="absolute top-1/2 left-1/2 border-2 border-matix-green-medium border-dashed rounded-full bg-matix-green-pale/30"
                  style={{
                    width: `${deliveryRadius * 4}px`,
                    height: `${deliveryRadius * 4}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                ></div>

                {/* Contrôles zoom */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button size="sm" className="w-8 h-8 p-0 bg-white text-gray-700 hover:bg-gray-100">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="w-8 h-8 p-0 bg-white text-gray-700 hover:bg-gray-100">
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Légende */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Ma ferme</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    <div className="w-3 h-1 border border-matix-green-medium border-dashed"></div>
                    <span>Zone de livraison ({deliveryRadius}km)</span>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Paramètres Livraison */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Paramètres de Livraison</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Rayon de livraison maximum: <span className="text-matix-green-medium font-bold">{deliveryRadius} km</span>
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={deliveryRadius}
                      onChange={(e) => setDeliveryRadius(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5km</span>
                      <span>100km</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frais de livraison par km
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={costPerKm}
                      onChange={(e) => setCostPerKm(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600">FCFA/km</span>
                  </div>
                </div>
              </Card>

              {/* Zones Couvertes */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Zones Couvertes</h2>
                <div className="space-y-3">
                  {coveredZones.map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-matix-green-medium" />
                        <div>
                          <p className="font-medium text-gray-900">{zone.name}</p>
                          <p className="text-xs text-gray-500">{zone.distance}km de votre ferme</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-matix-green-dark">{zone.cost.toLocaleString()} FCFA</p>
                        <p className="text-xs text-gray-500">frais de livraison</p>
                      </div>
                    </div>
                  ))}
                  
                  {coveredZones.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Aucune zone couverte avec ce rayon</p>
                      <p className="text-xs">Augmentez le rayon de livraison</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Disponibilité */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Disponibilité pour Livraisons</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Jours */}
                <div>
                  <h3 className="font-medium mb-3">Jours de livraison</h3>
                  <div className="space-y-2">
                    {days.map((day) => (
                      <label key={day.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDays.includes(day.id)}
                          onChange={() => toggleDay(day.id)}
                          className="w-4 h-4 text-matix-green-medium border-gray-300 rounded focus:ring-matix-green-medium"
                        />
                        <span className="text-sm text-gray-700">{day.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Créneaux horaires */}
                <div>
                  <h3 className="font-medium mb-3">Créneaux horaires</h3>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <label key={slot.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTimeSlots.includes(slot.id)}
                          onChange={() => toggleTimeSlot(slot.id)}
                          className="w-4 h-4 text-matix-green-medium border-gray-300 rounded focus:ring-matix-green-medium"
                        />
                        <span className="text-sm text-gray-700">{slot.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Bouton Sauvegarder */}
            <div className="text-center">
              <Button className="bg-matix-green-medium hover:bg-matix-green-dark text-white px-8 py-3 text-lg">
                Sauvegarder Paramètres
              </Button>
            </div>
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
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold">Livraison Gratuite</div>
                <div className="text-sm text-gray-500">À partir de 50,000 FCFA</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
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

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2E7D32;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2E7D32;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}