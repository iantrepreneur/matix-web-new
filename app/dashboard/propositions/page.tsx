"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { authService } from '@/lib/auth';
import { 
  CheckCircle, 
  X, 
  Clock, 
  DollarSign,
  Package,
  User,
  Calendar,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';

interface Proposition {
  id: string;
  distributor_id: string;
  producer_id: string;
  product_id: string;
  proposed_price: number;
  quantity: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  response_message?: string;
  created_at: string;
  responded_at?: string;
  expires_at?: string;
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    unit_type: string;
    images: string[];
  };
  users: {
    id: string;
    business_name: string;
    email: string;
    phone: string;
    is_verified: boolean;
  };
}

export default function PropositionsPage() {
  const [propositions, setPropositions] = useState<Proposition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchPropositions();
    }
  }, [filter, currentUser]);

  const fetchPropositions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/producers/propositions?producerId=${currentUser.id}&filter=${filter}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des propositions');
      }
      
      const data = await response.json();
      setPropositions(data.propositions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handlePropositionResponse = async (propositionId: string, status: 'accepted' | 'rejected', responseMessage?: string) => {
    try {
      const response = await fetch('/api/producers/propositions/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propositionId,
          status,
          responseMessage,
          producerId: currentUser.id
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la réponse à la proposition');
      }

      // Rafraîchir la liste
      fetchPropositions();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      accepted: { label: 'Acceptée', color: 'bg-green-100 text-green-800 border-green-200' },
      rejected: { label: 'Refusée', color: 'bg-red-100 text-red-800 border-red-200' },
      expired: { label: 'Expirée', color: 'bg-gray-100 text-gray-800 border-gray-200' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  if (loading) {
    return (
      <DashboardLayout currentUser={currentUser} activePage="propositions">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Propositions Reçues</h1>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-matix-green-medium"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout currentUser={currentUser} activePage="propositions">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Propositions Reçues</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentUser={currentUser} activePage="propositions">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Propositions Reçues</h1>
            <p className="text-gray-600 mt-1">
              Gérez les propositions d'achat des distributeurs
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'Toutes' },
            { key: 'pending', label: 'En attente' },
            { key: 'accepted', label: 'Acceptées' },
            { key: 'rejected', label: 'Refusées' },
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

        {/* Liste des propositions */}
        {propositions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune proposition {filter !== 'all' ? `(${filter})` : ''}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Vous n\'avez pas encore reçu de propositions des distributeurs.'
                : `Aucune proposition avec le statut "${filter}".`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {propositions.map((proposition) => {
              const totalPrice = proposition.proposed_price * proposition.quantity;
              const originalTotal = proposition.products.price * proposition.quantity;
              const difference = totalPrice - originalTotal;
              const percentageDiff = ((difference / originalTotal) * 100).toFixed(1);
              
              return (
                <div key={proposition.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusBadge(proposition.status)}
                      <h3 className="text-lg font-semibold text-gray-900">
                        PROPOSITION DE {proposition.users.business_name.toUpperCase()}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {formatDate(proposition.created_at)}
                      </div>
                      {proposition.users.is_verified && (
                        <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <CheckCircle className="h-3 w-3" />
                          Vérifié
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 font-medium">
                      Produit : {proposition.products.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {proposition.products.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Quantité demandée : <strong>{proposition.quantity}</strong> {proposition.products.unit_type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Prix proposé : <strong>{formatCurrency(proposition.proposed_price)}</strong> / {proposition.products.unit_type}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Votre prix actuel :</span>
                        <p className="font-bold text-gray-900">{formatCurrency(proposition.products.price)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Prix proposé :</span>
                        <p className="font-bold text-blue-600">{formatCurrency(proposition.proposed_price)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Différence :</span>
                        <p className={`font-bold ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {difference >= 0 ? '+' : ''}{formatCurrency(difference)} ({percentageDiff}%)
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-gray-600 text-sm">Total de la commande :</span>
                      <p className="font-bold text-lg text-gray-900">{formatCurrency(totalPrice)}</p>
                    </div>
                  </div>

                  {proposition.message && (
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
                        <div>
                          <span className="text-sm text-gray-600">Message du distributeur :</span>
                          <p className="text-sm text-gray-800 mt-1 bg-blue-50 p-3 rounded-lg">
                            {proposition.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{proposition.users.business_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{proposition.users.email}</span>
                    </div>
                    {proposition.users.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{proposition.users.phone}</span>
                      </div>
                    )}
                  </div>

                  {proposition.status === 'accepted' && proposition.responded_at && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Acceptée le {formatDate(proposition.responded_at)}
                        </span>
                      </div>
                      {proposition.response_message && (
                        <p className="text-sm text-green-700">
                          Votre réponse : {proposition.response_message}
                        </p>
                      )}
                    </div>
                  )}

                  {proposition.status === 'rejected' && proposition.responded_at && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">
                          Refusée le {formatDate(proposition.responded_at)}
                        </span>
                      </div>
                      {proposition.response_message && (
                        <p className="text-sm text-red-700">
                          Raison : {proposition.response_message}
                        </p>
                      )}
                    </div>
                  )}

                  {proposition.status === 'pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handlePropositionResponse(proposition.id, 'accepted', 'Proposition acceptée')}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Accepter
                      </button>
                      <button
                        onClick={() => handlePropositionResponse(proposition.id, 'rejected', 'Prix trop bas')}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Refuser
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Contacter
                      </button>
                    </div>
                  )}

                  {proposition.status === 'expired' && (
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-800">
                          Proposition expirée
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}