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
  Upload,
  Copy,
  Check,
  Eye,
  Edit,
  Trash2,
  Plus,
  ExternalLink,
  Share2,
  TrendingUp
} from 'lucide-react';

export default function BrandPage() {
  const [activePage, setActivePage] = useState('brand');
  const [activeTab, setActiveTab] = useState('configuration');
  const [brandColors, setBrandColors] = useState({
    primary: '#2563EB',
    secondary: '#FFC107',
    accent: '#10B981'
  });
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [brandName, setBrandName] = useState('FreshFarm Sénégal');
  const [brandSlogan, setBrandSlogan] = useState('Fraîcheur garantie du producteur au consommateur');
  const [brandAddress, setBrandAddress] = useState('Marché Colobane, Dakar');
  const [brandPhone, setBrandPhone] = useState('+221 77 123 45 67');
  const [brandEmail, setBrandEmail] = useState('contact@freshfarm.sn');
  const [brandWebsite, setBrandWebsite] = useState('');

  const brandStats = {
    visits: 247,
    orders: 12,
    revenue: '340,000'
  };

  const user = {
    name: "Fatou Enterprises",
    email: "fatou@enterprises.sn",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
  };

  const catalogProducts = [
    {
      id: 1,
      name: "Poulets fermiers",
      originalPrice: "4,500",
      myPrice: "5,200",
      margin: "15.6%",
      status: "Actif",
      image: "https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=120"
    },
    {
      id: 2,
      name: "Poussins ISA Brown",
      originalPrice: "850",
      myPrice: "1,000",
      margin: "17.6%",
      status: "Actif",
      image: "https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=120"
    },
    {
      id: 3,
      name: "Aliment ponte 25kg",
      originalPrice: "18,500",
      myPrice: "21,500",
      margin: "16.2%",
      status: "Inactif",
      image: "https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=120"
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

  const publicUrl = "https://matix.sn/boutique/freshfarm-senegal";

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'Actif': 'bg-green-100 text-green-800',
      'Inactif': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
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
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Ma Boutique en Marque Blanche</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">Visites: <span className="font-bold text-green-600">{brandStats.visits}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">CA: <span className="font-bold text-green-600">{brandStats.revenue} FCFA</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Onglets */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'configuration'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('configuration')}
                >
                  Configuration
                </button>
                <button
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'products'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('products')}
                >
                  Produits
                </button>
                <button
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'preview'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('preview')}
                >
                  Aperçu Boutique
                </button>
              </div>
            </div>

            {/* Contenu des onglets */}
            {activeTab === 'configuration' && (
              <>
                {/* Section Identité */}
                <Card className="p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Identité de Marque</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom de marque</label>
                      <Input
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="FreshFarm Sénégal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
                      <Input
                        value={brandSlogan}
                        onChange={(e) => setBrandSlogan(e.target.value)}
                        placeholder="Fraîcheur garantie du producteur au consommateur"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Upload Logo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Logo de la marque</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-1">Glissez votre logo ici</p>
                        <p className="text-xs text-gray-400">(PNG, JPG jusqu'à 2MB)</p>
                      </div>
                    </div>

                    {/* Upload Bannière */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bannière boutique</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-1">Glissez votre bannière ici</p>
                        <p className="text-xs text-gray-400">(1200x400px recommandé)</p>
                      </div>
                    </div>
                  </div>

                  {/* Couleurs */}
                  <div>
                    <h3 className="font-medium mb-3">Couleurs de la marque</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Couleur principale</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={brandColors.primary}
                            onChange={(e) => setBrandColors({...brandColors, primary: e.target.value})}
                            className="w-10 h-10 rounded border border-gray-300"
                          />
                          <Input
                            value={brandColors.primary}
                            onChange={(e) => setBrandColors({...brandColors, primary: e.target.value})}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Couleur secondaire</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={brandColors.secondary}
                            onChange={(e) => setBrandColors({...brandColors, secondary: e.target.value})}
                            className="w-10 h-10 rounded border border-gray-300"
                          />
                          <Input
                            value={brandColors.secondary}
                            onChange={(e) => setBrandColors({...brandColors, secondary: e.target.value})}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Section Contact */}
                <Card className="p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Informations de Contact</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse boutique</label>
                      <Input
                        value={brandAddress}
                        onChange={(e) => setBrandAddress(e.target.value)}
                        placeholder="Marché Colobane, Dakar"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone service client</label>
                      <Input
                        value={brandPhone}
                        onChange={(e) => setBrandPhone(e.target.value)}
                        placeholder="+221 77 123 45 67"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email professionnel</label>
                      <Input
                        type="email"
                        value={brandEmail}
                        onChange={(e) => setBrandEmail(e.target.value)}
                        placeholder="contact@freshfarm.sn"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site web (optionnel)</label>
                      <Input
                        value={brandWebsite}
                        onChange={(e) => setBrandWebsite(e.target.value)}
                        placeholder="https://freshfarm.sn"
                      />
                    </div>
                  </div>
                </Card>

                {/* Lien Public */}
                <Card className="p-6 mb-6">
                  <h2 className="text-lg font-semibold mb-4">Lien Public de la Boutique</h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">URL de votre boutique :</p>
                        <p className="font-mono text-blue-600 break-all">{publicUrl}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyUrl}
                        className="ml-4 flex items-center gap-2"
                      >
                        {copiedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copiedUrl ? 'Copié' : 'Copier'}
                      </Button>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setActiveTab('preview')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Prévisualiser
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Partager
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Bouton Sauvegarder */}
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                    Sauvegarder Configuration
                  </Button>
                </div>
              </>
            )}

            {activeTab === 'products' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Catalogue Produits Sélectionnés</h2>
                  <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter Produits
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Photo</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Nom Personnalisé</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Prix Producteur</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Prix de Vente</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Marge</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalogProducts.map((product, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                          <td className="py-3 px-4 text-gray-600">{product.originalPrice} FCFA</td>
                          <td className="py-3 px-4 font-medium text-gray-900">{product.myPrice} FCFA</td>
                          <td className="py-3 px-4 text-green-600 font-medium">{product.margin}</td>
                          <td className="py-3 px-4">{getStatusBadge(product.status)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {activeTab === 'preview' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Aperçu de votre Boutique</h2>
                
                {/* Preview mockée */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Header boutique */}
                  <div 
                    className="p-6 text-white"
                    style={{ backgroundColor: brandColors.primary }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏪</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{brandName}</h3>
                        <p className="opacity-90">{brandSlogan}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contenu boutique */}
                  <div className="p-6 bg-gray-50">
                    <h4 className="font-semibold mb-4">Nos Produits Sélectionnés</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {catalogProducts.slice(0, 3).map((product, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 text-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-20 object-cover rounded mb-2"
                          />
                          <h5 className="text-sm font-medium mb-1">{product.name}</h5>
                          <p className="text-sm font-bold" style={{ color: brandColors.primary }}>
                            {product.myPrice} FCFA
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer boutique */}
                  <div className="p-4 bg-gray-100 text-center">
                    <p className="text-sm text-gray-600">
                      📞 {brandPhone} | ✉️ {brandEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Voir en tant que client
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Partager la boutique
                  </Button>
                </div>
              </Card>
            )}
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