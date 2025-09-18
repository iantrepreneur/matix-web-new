"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { authService } from '@/lib/auth';
import { 
  Plus,
  Eye,
  Calendar,
  MapPin,
  DollarSign,
  Package,
  User,
  Clock,
  CheckCircle,
  AlertCircle
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
  distributor_id: string;
  distributor_name: string;
  offers_count: number;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchRequests();
    }
  }, [filter, currentUser]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/requests/all?filter=${filter}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des demandes');
      }
      
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Active</span>;
      case 'closed':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Fermée</span>;
      case 'expired':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Expirée</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{status}</span>;
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

  const handleCreateOffer = async (requestId: string) => {
    // Rediriger vers la page de création d'offre
    window.location.href = `/dashboard/requests/${requestId}/offer`;
  };

  if (loading) {
    return (
      <DashboardLayout currentUser={currentUser} activePage="requests">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Demandes de Livraison</h1>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-matix-green-medium"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentUser={currentUser} activePage="requests">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Demandes de Livraison</h1>
            <p className="text-gray-600 mt-1">
              Opportunités de vente des distributeurs et clients
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'Toutes' },
            { key: 'active', label: 'Actives' },
            { key: 'closed', label: 'Fermées' },
            { key: 'expired', label: 'Expirées' }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === filterOption.key
                  ? 'bg-matix-green-medium text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>

        {/* Statistiques */}
        {requests.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.status === 'active').length}
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
              <div className="text-sm text-gray-600">Offres totales</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {requests.filter(r => r.status === 'closed').length}
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

        {/* Liste des demandes */}
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune demande trouvée
            </h3>
            <p className="text-gray-500">
              Il n'y a pas encore de demandes de livraison disponibles.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
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
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>Demandé par: {request.distributor_name}</span>
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
                      <span className="text-blue-600 font-medium">
                        {request.offers_count} offre{request.offers_count > 1 ? 's' : ''}
                      </span>
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
                    <button
                      onClick={() => handleCreateOffer(request.id)}
                      className="bg-matix-green-medium hover:bg-matix-green-dark text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      disabled={request.status !== 'active'}
                    >
                      <Plus className="h-4 w-4" />
                      Faire une offre
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}