"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  X,
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  User,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Star
} from 'lucide-react';

interface Offer {
  id: string;
  request_id: string;
  producer_id: string;
  price_per_unit: number;
  total_price: number;
  available_quantity: number;
  delivery_time_days: number;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
  producer: {
    id: string;
    business_name: string;
    email: string;
    phone: string;
    is_verified: boolean;
  };
}

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  requestTitle: string;
  onOfferStatusChange?: () => void;
}

export default function OffersModal({ 
  isOpen, 
  onClose, 
  requestId, 
  requestTitle,
  onOfferStatusChange 
}: OffersModalProps) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingOfferId, setProcessingOfferId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && requestId) {
      fetchOffers();
    }
  }, [isOpen, requestId]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/requests/${requestId}/offers`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des offres');
      }
      
      const data = await response.json();
      setOffers(data.offers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleOfferAction = async (offerId: string, action: 'accept' | 'reject') => {
    try {
      setProcessingOfferId(offerId);
      
      const response = await fetch(`/api/requests/offers/${offerId}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de ${action === 'accept' ? 'l\'acceptation' : 'du refus'} de l'offre`);
      }

      // Rafraîchir les offres
      await fetchOffers();
      
      // Notifier le parent du changement
      if (onOfferStatusChange) {
        onOfferStatusChange();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setProcessingOfferId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">En attente</span>;
      case 'accepted':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Acceptée</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Refusée</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Offres Reçues</h2>
            <p className="text-sm text-gray-600 mt-1">{requestTitle}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune offre reçue
              </h3>
              <p className="text-gray-500">
                Les producteurs n'ont pas encore fait d'offres pour cette demande.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {offer.producer.business_name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{offer.producer.email}</span>
                          </div>
                          {offer.producer.phone && (
                            <div className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{offer.producer.phone}</span>
                            </div>
                          )}
                          {offer.producer.is_verified && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircle className="h-3 w-3" />
                              <span>Vérifié</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(offer.status)}
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDate(offer.created_at)}
                      </div>
                    </div>
                  </div>

                  {/* Détails de l'offre */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Prix unitaire</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(offer.price_per_unit)}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Quantité disponible</span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">
                        {offer.available_quantity}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium text-gray-700">Délai livraison</span>
                      </div>
                      <p className="text-lg font-bold text-orange-600">
                        {offer.delivery_time_days} jour{offer.delivery_time_days > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  {/* Prix total */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800">Prix total de l'offre</span>
                      <span className="text-xl font-bold text-blue-900">
                        {formatCurrency(offer.total_price)}
                      </span>
                    </div>
                  </div>

                  {/* Message du producteur */}
                  {offer.message && (
                    <div className="mb-4">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
                        <div>
                          <span className="text-sm font-medium text-gray-700">Message du producteur :</span>
                          <p className="text-sm text-gray-600 mt-1 bg-white p-3 rounded-lg border">
                            {offer.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {offer.status === 'pending' && (
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleOfferAction(offer.id, 'accept')}
                        disabled={processingOfferId === offer.id}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>
                          {processingOfferId === offer.id ? 'Acceptation...' : 'Accepter l\'offre'}
                        </span>
                      </Button>
                      
                      <Button
                        onClick={() => handleOfferAction(offer.id, 'reject')}
                        disabled={processingOfferId === offer.id}
                        variant="outline"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50 flex items-center justify-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Refuser</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center space-x-2"
                      >
                        <Phone className="h-4 w-4" />
                        <span>Contacter</span>
                      </Button>
                    </div>
                  )}

                  {offer.status === 'accepted' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-green-800">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Offre acceptée</span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        Cette offre a été acceptée. Le producteur va préparer votre commande.
                      </p>
                    </div>
                  )}

                  {offer.status === 'rejected' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-red-800">
                        <X className="h-5 w-5" />
                        <span className="font-medium">Offre refusée</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}