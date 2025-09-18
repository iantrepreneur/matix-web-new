"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Smartphone, DollarSign, CheckCircle } from 'lucide-react';

interface PaymentButtonProps {
  proposition: any;
  onPaymentSuccess: () => void;
}

export default function PaymentButton({ proposition, onPaymentSuccess }: PaymentButtonProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const paymentMethods = [
    { id: 'orange_money', name: 'Orange Money', icon: '📱', color: 'bg-orange-500' },
    { id: 'wave', name: 'Wave', icon: '📱', color: 'bg-blue-500' },
    { id: 'free_money', name: 'Free Money', icon: '📱', color: 'bg-green-500' },
    { id: 'cash', name: 'Paiement à la livraison', icon: '💰', color: 'bg-gray-500' }
  ];

  const totalAmount = proposition.proposed_price * proposition.quantity;

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setProcessing(true);
    
    try {
      // Simuler le processus de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici vous intégreriez avec l'API de paiement réelle
      const response = await fetch('/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propositionId: proposition.id,
          amount: totalAmount,
          method: selectedMethod,
          distributorId: proposition.distributor_id,
          producerId: proposition.producer_id
        })
      });

      if (response.ok) {
        setShowPaymentModal(false);
        onPaymentSuccess();
      } else {
        throw new Error('Erreur lors du paiement');
      }
    } catch (error) {
      console.error('Erreur de paiement:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPaymentModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
      >
        <CreditCard className="h-4 w-4" />
        💳 Payer Maintenant
      </button>

      {/* Modal de paiement */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Finaliser le Paiement</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Résumé de la commande */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Résumé de la commande</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Produit:</span>
                    <span>{proposition.products.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantité:</span>
                    <span>{proposition.quantity} {proposition.products.unit_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prix unitaire:</span>
                    <span>{proposition.proposed_price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>{totalAmount.toLocaleString()} FCFA</span>
                  </div>
                </div>
              </div>

              {/* Méthodes de paiement */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Choisir une méthode de paiement</h4>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={(e) => setSelectedMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className={`w-8 h-8 rounded-full ${method.color} flex items-center justify-center text-white mr-3`}>
                        {method.icon}
                      </div>
                      <span className="font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1"
                  disabled={processing}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={!selectedMethod || processing}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payer {totalAmount.toLocaleString()} FCFA
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}