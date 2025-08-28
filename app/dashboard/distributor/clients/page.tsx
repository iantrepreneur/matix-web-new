"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  Search, 
  Bell, 
  FileText, 
  Store, 
  Users, 
  User as UserIcon, 
  LogOut,
  Filter,
  RotateCcw,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  MessageSquare,
  Send,
  X,
  ChevronDown,
  Star,
  ShoppingBag,
  CreditCard
} from 'lucide-react';

export default function ClientsPage() {
  const [activePage, setActivePage] = useState('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const user = {
    name: "Fatou Enterprises",
    email: "fatou@enterprises.sn",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
  };

  const clients = [
    {
      id: "CL001",
      name: "Restaurant Le Lagon",
      type: "Restaurant",
      contact: "+221 33 123 456",
      email: "commandes@lelagon.sn",
      lastOrder: "15/08/25",
      totalSpent: "890,000",
      status: "Actif",
      region: "Dakar",
      address: "Corniche Ouest, Dakar",
      orderHistory: [
        { date: "15/08/25", products: "30 poulets + 200 œufs", amount: "185,000" },
        { date: "08/08/25", products: "50 poulets fermiers", amount: "225,000" },
        { date: "01/08/25", products: "100 œufs + aliments", amount: "85,000" }
      ],
      preferences: ["Poulets bio", "Livraison matin", "Facture mensuelle"],
      notes: "Client premium, commandes régulières le lundi. Préfère les poulets fermiers."
    },
    {
      id: "CL002",
      name: "Particulier Ba",
      type: "Particulier",
      contact: "+221 77 987 654",
      email: "ibrahima.ba@gmail.com",
      lastOrder: "22/08/25",
      totalSpent: "45,000",
      status: "Actif",
      region: "Thiès",
      address: "Quartier Randoulène, Thiès",
      orderHistory: [
        { date: "22/08/25", products: "5 poulets + mangeoire", amount: "28,500" },
        { date: "10/08/25", products: "10 poussins", amount: "8,500" }
      ],
      preferences: ["Poussins pondeuses", "Livraison weekend"],
      notes: "Nouveau dans l'élevage, demande souvent des conseils."
    },
    {
      id: "CL003",
      name: "Hôtel King Fahd",
      type: "Hôtel",
      contact: "+221 33 456 789",
      email: "procurement@kingfahd.sn",
      lastOrder: "10/08/25",
      totalSpent: "1,250,000",
      status: "Premium",
      region: "Dakar",
      address: "Route de Ngor, Dakar",
      orderHistory: [
        { date: "10/08/25", products: "100 poulets + équipements", amount: "450,000" },
        { date: "25/07/25", products: "200 poulets fermiers", amount: "900,000" }
      ],
      preferences: ["Poulets premium", "Livraison quotidienne", "Facturation hebdomadaire"],
      notes: "Client VIP - Commandes importantes et régulières. Contact privilégié."
    },
    {
      id: "CL004",
      name: "Chez Loutcha",
      type: "Restaurant",
      contact: "+221 33 789 123",
      email: "loutcha@restaurant.sn",
      lastOrder: "20/08/25",
      totalSpent: "320,000",
      status: "Actif",
      region: "Dakar",
      address: "Plateau, Dakar",
      orderHistory: [
        { date: "20/08/25", products: "25 poulets + condiments", amount: "125,000" },
        { date: "12/08/25", products: "40 poulets fermiers", amount: "180,000" }
      ],
      preferences: ["Poulets locaux", "Livraison après-midi"],
      notes: "Restaurant traditionnel, préfère les produits locaux."
    },
    {
      id: "CL005",
      name: "Ferme Scolaire Thiès",
      type: "Autre",
      contact: "+221 33 654 321",
      email: "ferme@ecole-thies.edu.sn",
      lastOrder: "18/08/25",
      totalSpent: "180,000",
      status: "Actif",
      region: "Thiès",
      address: "École Supérieure d'Agriculture, Thiès",
      orderHistory: [
        { date: "18/08/25", products: "Matériel pédagogique", amount: "95,000" },
        { date: "05/08/25", products: "50 poussins + aliments", amount: "85,000" }
      ],
      preferences: ["Matériel éducatif", "Livraison groupée"],
      notes: "Projet éducatif - Tarifs préférentiels appliqués."
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'search', label: 'Rechercher Producteurs', icon: <Search className="h-4 w-4" /> },
    { id: 'alerts', label: 'Mes Alertes', icon: <Bell className="h-4 w-4" /> },
    { id: 'quotes', label: 'Mes Devis', icon: <FileText className="h-4 w-4" /> },
    { id: 'brand', label: 'Ma Marque', icon: <Store className="h-4 w-4" /> },
    { id: 'clients', label: 'Mes Clients', icon: <Users className="h-4 w-4" /> },
    { id: 'profile', label: 'Mon Profil', icon: <UserIcon className="h-4 w-4" /> },
    { id: 'logout', label: 'Déconnexion', icon: <LogOut className="h-4 w-4" /> }
  ];

  const typeOptions = [
    { value: 'all', label: 'Tous types' },
    { value: 'particulier', label: 'Particuliers' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'hotel', label: 'Hôtels' },
    { value: 'autre', label: 'Autres entreprises' }
  ];

  const regionOptions = [
    { value: 'all', label: 'Toutes régions' },
    { value: 'dakar', label: 'Dakar' },
    { value: 'thies', label: 'Thiès' },
    { value: 'kaolack', label: 'Kaolack' },
    { value: 'saint-louis', label: 'Saint-Louis' }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Actif': 'bg-green-100 text-green-800',
      'Premium': 'bg-yellow-100 text-yellow-800',
      'Inactif': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeStyles = {
      'Particulier': 'bg-blue-100 text-blue-800',
      'Restaurant': 'bg-orange-100 text-orange-800',
      'Hôtel': 'bg-purple-100 text-purple-800',
      'Autre': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[type as keyof typeof typeStyles] || 'bg-gray-100 text-gray-800'}`}>
        {type}
      </span>
    );
  };

  const handleAction = (action: string, clientId: string) => {
    if (action === 'view') {
      const client = clients.find(c => c.id === clientId);
      setSelectedClient(client);
      setShowDetailsModal(true);
    }
    setOpenDropdown(null);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setRegionFilter('all');
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
                <p className="text-xs text-blue-600">Distributeur</p>
              </div>

              {/* Menu Navigation */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.id === 'dashboard' ? '/dashboard/distributor' : `/dashboard/distributor/${item.id}`}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activePage === item.id 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
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
              <h1 className="text-2xl font-bold text-gray-900">Gestion de Ma Clientèle</h1>
            </div>

            {/* Filtres */}
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Filtres de Recherche</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Nom ou entreprise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type Client</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    {typeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                  >
                    {regionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="w-full flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tableau Clients */}
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Dernière Commande</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Total Dépensé</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{client.name}</p>
                            <p className="text-xs text-gray-500">{client.region}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">{getTypeBadge(client.type)}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm text-gray-900">{client.contact}</p>
                            <p className="text-xs text-gray-500">{client.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{client.lastOrder}</td>
                        <td className="py-3 px-4 font-medium text-gray-900">{client.totalSpent} FCFA</td>
                        <td className="py-3 px-4">{getStatusBadge(client.status)}</td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => setOpenDropdown(openDropdown === client.id ? null : client.id)}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            
                            {/* Actions Dropdown */}
                            {openDropdown === client.id && (
                              <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <button
                                  onClick={() => handleAction('view', client.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="text-sm">Voir historique</span>
                                </button>
                                <button
                                  onClick={() => handleAction('quote', client.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm">Créer devis</span>
                                </button>
                                <button
                                  onClick={() => handleAction('catalog', client.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Send className="h-4 w-4" />
                                  <span className="text-sm">Envoyer catalogue</span>
                                </button>
                                <button
                                  onClick={() => handleAction('call', client.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Phone className="h-4 w-4" />
                                  <span className="text-sm">Programmer rappel</span>
                                </button>
                                <button
                                  onClick={() => handleAction('notes', client.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                  <span className="text-sm">Noter commentaires</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Détail Client */}
      {showDetailsModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Profil Client - {selectedClient.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetailsModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations Client */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Informations Client
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-gray-400" />
                    <span>{selectedClient.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{selectedClient.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{selectedClient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Statut:</span>
                    {getStatusBadge(selectedClient.status)}
                  </div>
                </div>
              </div>

              {/* Historique Commandes */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Historique des Commandes
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Produits</th>
                        <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Montant</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClient.orderHistory?.map((order: any, index: number) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="py-2 px-3 text-sm">{order.date}</td>
                          <td className="py-2 px-3 text-sm">{order.products}</td>
                          <td className="py-2 px-3 text-sm font-medium">{order.amount} FCFA</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Préférences */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Préférences Client
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedClient.preferences?.map((pref: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {pref}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Notes Privées
                </h4>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{selectedClient.notes}</p>
                </div>
              </div>

              {/* Résumé */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Total Dépensé</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{selectedClient.totalSpent} FCFA</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Dernière commande</span>
                  </div>
                  <span className="text-sm">{selectedClient.lastOrder}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Nouveau Devis
                </Button>
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Envoyer Catalogue
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Contacter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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