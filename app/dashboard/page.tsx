"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import InvoiceModal from '@/components/InvoiceModal';
import { authService, User as UserType } from '@/lib/auth';
import { 
  BarChart3, 
  Package, 
  Star, 
  User as UserIcon, 
  Edit, 
  Lock, 
  LogOut,
  ShoppingCart,
  Clock,
  Settings,
  CheckCircle,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('dashboard');
  const [currentPage, setCurrentPage] = useState(1);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès non autorisé</h1>
          <p className="text-gray-600 mb-6">Veuillez vous connecter pour accéder au dashboard.</p>
          <Link href="/">
            <Button className="bg-matix-green-medium hover:bg-matix-green-dark text-white">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Produits Publiés",
      value: "45",
      icon: <ShoppingCart className="h-6 w-6 text-matix-green-medium" />
    },
    {
      title: "Commandes Reçues",
      value: "23",
      icon: <Clock className="h-6 w-6 text-matix-green-medium" />
    },
    {
      title: "Commandes en Cours",
      value: "8",
      icon: <Settings className="h-6 w-6 text-matix-green-medium" />
    },
    {
      title: "Revenus du Mois",
      value: "450,000 FCFA",
      icon: <CheckCircle className="h-6 w-6 text-matix-green-medium" />
    }
  ];

  const receivedOrders = [
    { id: "B9K2", client: "Amadou Diallo", product: "Poulet Fermier Bio", quantity: "2", status: "En cours", totalPrice: "9000 FCFA" },
    { id: "D185", client: "Fatou Sall", product: "Poussins ISA Brown", quantity: "10", status: "Confirmée", totalPrice: "8500 FCFA" },
    { id: "B6B1", client: "Ibrahima Ba", product: "Œufs à Couver", quantity: "50", status: "Livrée", totalPrice: "6250 FCFA" },
    { id: "C3F7", client: "Aïcha Diop", product: "Poulets de Chair", quantity: "5", status: "En cours", totalPrice: "12000 FCFA" },
    { id: "E8G2", client: "Moussa Fall", product: "Poussins Hubbard", quantity: "20", status: "Confirmée", totalPrice: "15000 FCFA" },
    { id: "F1H9", client: "Khadija Ndiaye", product: "Œufs Frais", quantity: "100", status: "Livrée", totalPrice: "8000 FCFA" },
    { id: "G4J5", client: "Ousmane Sarr", product: "Poulets Locaux", quantity: "3", status: "En cours", totalPrice: "7500 FCFA" },
    { id: "H7K8", client: "Mariama Diallo", product: "Poussins Ross", quantity: "15", status: "Confirmée", totalPrice: "11250 FCFA" },
    { id: "I2L3", client: "Cheikh Mbaye", product: "Œufs Bio", quantity: "75", status: "Livrée", totalPrice: "9000 FCFA" },
    { id: "J5M6", client: "Aminata Ba", product: "Poulets Fermiers", quantity: "4", status: "En cours", totalPrice: "10000 FCFA" }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'products', label: 'Mes Produits', icon: <Package className="h-4 w-4" /> },
    { id: 'orders', label: 'Commandes', icon: <ShoppingCart className="h-4 w-4" /> },
    { id: 'reviews', label: 'Avis & Notes', icon: <Star className="h-4 w-4" /> },
    { id: 'profile', label: 'Mon Profil', icon: <UserIcon className="h-4 w-4" /> },
    { id: 'edit-profile', label: 'Modifier Profil', icon: <Edit className="h-4 w-4" /> },
    { id: 'change-password', label: 'Changer Mot de Passe', icon: <Lock className="h-4 w-4" /> },
    { id: 'logout', label: 'Déconnexion', icon: <LogOut className="h-4 w-4" /> }
  ];

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      "En cours": "bg-blue-100 text-blue-800",
      "Confirmée": "bg-orange-100 text-orange-800",
      "Livrée": "bg-green-100 text-green-800",
      "Annulée": "bg-red-100 text-red-800"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || 'bg-blue-100 text-blue-800'}`}>
        {status}
      </span>
    );
  };

  const totalPages = Math.ceil(receivedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = receivedOrders.slice(startIndex, endIndex);

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
            <button onClick={handleLogout} className="hover:text-green-600 flex items-center gap-1">
              🔒 Déconnexion
            </button>
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
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{currentUser.name}</h3>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
                <p className="text-xs text-matix-green-medium capitalize">{currentUser.profile}</p>
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Bienvenue sur votre tableau de bord</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="p-3 bg-matix-green-pale rounded-full">
                      {stat.icon}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Orders Table */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Commandes Reçues Récentes</h2>
                <Link href="/dashboard/orders">
                  <Button variant="outline" size="sm">
                    Voir toutes
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Produit</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Quantité</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Prix Total</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                        <td className="py-3 px-4 text-gray-600">{order.client}</td>
                        <td className="py-3 px-4 text-gray-600">{order.product}</td>
                        <td className="py-3 px-4 text-gray-600">{order.quantity}</td>
                        <td className="py-3 px-4">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">{order.totalPrice}</td>
                        <td className="py-3 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowInvoice(true);
                            }}
                            className="text-matix-green-medium hover:text-matix-green-dark"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-600">
                  SHOWING {startIndex + 1}-{Math.min(endIndex, receivedOrders.length)} OF {receivedOrders.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={currentPage === pageNum ? "bg-matix-green-medium text-white" : ""}
                        >
                          {pageNum}
                        </Button>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return <span key={pageNum} className="px-2">...</span>;
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && selectedOrder && (
        <InvoiceModal
          order={selectedOrder}
          isOpen={showInvoice}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </div>
  );
}