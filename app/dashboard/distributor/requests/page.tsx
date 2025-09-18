"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OffersModal from '@/components/modals/OffersModal';
import { 
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Package,
  Loader2,
  AlertCircle,
  CheckCircle,
  ChevronDown
} from 'lucide-react';

interface Request {
  id: string;
  title: string;
  category_id?: string;
  category?: {
    id: string;
    name: string;
    name_fr: string;
    icon: string;
  };
  quantity: number;
  weight?: number;
  unit: string;
  deadline: string;
  description?: string;
  status: string;
  budget_max?: number;
  delivery_location?: string;
  created_at: string;
  updated_at: string;
  offers_count: number;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('active');
  const [offersModal, setOffersModal] = useState<{
    isOpen: boolean;
    requestId: string;
    requestTitle: string;
  }>({
    isOpen: false,
    requestId: '',
    requestTitle: ''
  });
  const [visibleRequests, setVisibleRequests] = useState(5);
  const [showLoadMore, setShowLoadMore] = useState(false);

  // ID utilisateur pour les tests (à remplacer par l'ID de l'utilisateur connecté)
  const userId = '303f243a-9129-4e94-8a6f-f8e247f0d15e';

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/requests', {
        headers: {
          'x-user-id': userId
        }
      });

      const data = await response.json();

      if (data.success) {
        setRequests(data.requests);
      } else {
        setError(data.error || 'Erreur lors du chargement des demandes');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors du chargement des demandes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async (requestId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/requests/${requestId}`, {
        method: 'DELETE',
        headers: {
          'x-user-id': userId
        }
      });

      const data = await response.json();

      if (data.success) {
        setRequests(requests.filter(req => req.id !== requestId));
      } else {
        setError(data.error || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la suppression');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'closed':
        return <Badge className="bg-blue-100 text-blue-800">Fermée</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expirée</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleOffersClick = (requestId: string, requestTitle: string) => {
    setOffersModal({
      isOpen: true,
      requestId,
      requestTitle
    });
  };

  const handleOffersModalClose = () => {
    setOffersModal({
      isOpen: false,
      requestId: '',
      requestTitle: ''
    });
  };

  const handleOfferStatusChange = () => {
    // Recharger les demandes pour mettre à jour les compteurs
    loadRequests();
  };

  const handleLoadMore = () => {
    setVisibleRequests(prev => prev + 5);
  };

  const getTabRequests = (tab: string) => {
    switch (tab) {
      case 'active':
        return requests.filter(r => r.status === 'active');
      case 'draft':
        return requests.filter(r => r.status === 'draft');
      case 'closed':
        return requests.filter(r => r.status === 'closed');
      case 'expired':
        return requests.filter(r => r.status === 'expired');
      default:
        return requests;
    }
  };

  const filteredRequests = getTabRequests(activeTab).filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const displayedRequests = filteredRequests.slice(0, visibleRequests);
  const hasMoreRequests = filteredRequests.length > visibleRequests;

  const getTabCounts = () => {
    return {
      active: requests.filter(r => r.status === 'active').length,
      draft: requests.filter(r => r.status === 'draft').length,
      closed: requests.filter(r => r.status === 'closed').length,
      expired: requests.filter(r => r.status === 'expired').length
    };
  };

  const tabCounts = getTabCounts();

  if (loading) {
    return (
      <div className="bg-white p-8">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Chargement des demandes...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header avec titre et bouton */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestion des Demandes
        </h1>
        <Link href="/dashboard/distributor/requests/new">
          <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nouvelle Demande</span>
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 mb-6 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('active')}
          className={`pb-2 font-medium ${
            activeTab === 'active' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Demandes Actives ({tabCounts.active})
        </button>
        <button 
          onClick={() => setActiveTab('draft')}
          className={`pb-2 font-medium ${
            activeTab === 'draft' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Brouillons ({tabCounts.draft})
        </button>
        <button 
          onClick={() => setActiveTab('closed')}
          className={`pb-2 font-medium ${
            activeTab === 'closed' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Fermées ({tabCounts.closed})
        </button>
        <button 
          onClick={() => setActiveTab('expired')}
          className={`pb-2 font-medium ${
            activeTab === 'expired' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Expirées ({tabCounts.expired})
        </button>
      </div>

      {/* Statistiques en haut */}
      {requests.length > 0 && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {tabCounts.active}
            </div>
            <div className="text-sm text-gray-600">Demandes actives</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {requests.reduce((sum, r) => sum + r.offers_count, 0)}
            </div>
            <div className="text-sm text-gray-600">Offres reçues</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {tabCounts.closed}
            </div>
            <div className="text-sm text-gray-600">Demandes fermées</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {requests.length}
            </div>
            <div className="text-sm text-gray-600">Total demandes</div>
          </div>
        </div>
      )}

      {/* Filtres et recherche */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une demande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Active</option>
          <option value="closed">Fermée</option>
          <option value="expired">Expirée</option>
        </select>
      </div>

      {/* Messages d'erreur */}
      {error && (
        <div className="mb-6 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Liste des demandes - Design exact de la capture d'écran */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune demande trouvée
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Aucune demande ne correspond à vos critères de recherche.'
              : 'Vous n\'avez pas encore créé de demande.'
            }
          </p>
          <Link href="/dashboard/distributor/requests/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Créer ma première demande
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedRequests.map((request) => (
            <div key={request.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Titre et statut */}
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {request.title}
                    </h3>
                    {getStatusBadge(request.status)}
                  </div>

                  {/* Détails principaux */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Package className="h-4 w-4" />
                        <span>{request.quantity} {request.unit}</span>
                        {request.weight && (
                          <span className="text-gray-400">({request.weight}kg/unité)</span>
                        )}
                      </div>
                      
                      {request.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {request.description}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Échéance: {formatDate(request.deadline)}</span>
                      </div>

                      {request.budget_max && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>Budget: {formatCurrency(request.budget_max)}</span>
                        </div>
                      )}

                      {request.delivery_location && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{request.delivery_location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Métadonnées */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Créée le {formatDate(request.created_at)}</span>
                    <span>•</span>
                    <button
                      onClick={() => handleOffersClick(request.id, request.title)}
                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      {request.offers_count} offre{request.offers_count > 1 ? 's' : ''}
                    </button>
                    {request.category && (
                      <>
                        <span>•</span>
                        <span>{request.category.name_fr || request.category.name}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <Link href={`/dashboard/distributor/requests/${request.id}`}>
                    <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-800">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteRequest(request.id)}
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bouton "Afficher plus" */}
          {hasMoreRequests && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                className="px-6 py-2"
              >
                Afficher plus ({filteredRequests.length - visibleRequests} restantes)
              </Button>
            </div>
          )}
        </div>
      )}


      {/* Modal des offres */}
      <OffersModal
        isOpen={offersModal.isOpen}
        onClose={handleOffersModalClose}
        requestId={offersModal.requestId}
        requestTitle={offersModal.requestTitle}
        onOfferStatusChange={handleOfferStatusChange}
      />
    </div>
  );
}