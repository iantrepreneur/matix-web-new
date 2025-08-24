"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Printer, CreditCard } from 'lucide-react';

interface OrderData {
  id: string;
  orderTime: string;
  method: string;
  status: string;
  shipping: string;
  shippingCost: string;
  total: string;
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderData: OrderData;
}

export default function InvoiceModal({ isOpen, onClose, orderId, orderData }: InvoiceModalProps) {
  if (!isOpen) return null;

  // Données produits selon l'ID de commande
  const getProductData = (id: string) => {
    const products = {
      'B9K2': {
        name: 'Poulet Fermier Race Locale',
        image: 'https://images.pexels.com/photos/1556909/pexels-photo-1556909.jpeg?auto=compress&cs=tinysrgb&w=120',
        qty: 2,
        unitPrice: 25000,
        total: 50000
      },
      'D185': {
        name: 'Poussins Pondeuses ISA',
        image: 'https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=120',
        qty: 10,
        unitPrice: 2500,
        total: 25000
      },
      'B6B1': {
        name: 'Cage Élevage 20 Poules',
        image: 'https://images.pexels.com/photos/1300357/pexels-photo-1300357.jpeg?auto=compress&cs=tinysrgb&w=120',
        qty: 1,
        unitPrice: 125000,
        total: 125000
      },
      '6230': {
        name: 'Aliment Ponte 25kg',
        image: 'https://images.pexels.com/photos/533360/pexels-photo-533360.jpeg?auto=compress&cs=tinysrgb&w=120',
        qty: 1,
        unitPrice: 28000,
        total: 28000
      }
    };
    return products[id as keyof typeof products] || products['B9K2'];
  };

  // Données client selon l'ID
  const getCustomerData = (id: string) => {
    const customers = {
      'B9K2': {
        name: 'Amadou Diallo',
        email: 'amadou@gmail.com',
        address: 'Marché Colobane, Dakar',
        phone: '+221 77 123 4567'
      },
      'D185': {
        name: 'Fatou Sall',
        email: 'fatou@gmail.com',
        address: 'Pikine, Dakar',
        phone: '+221 76 234 5678'
      },
      'B6B1': {
        name: 'Ibrahima Ba',
        email: 'ibrahima@gmail.com',
        address: 'Guédiawaye, Dakar',
        phone: '+221 75 345 6789'
      },
      '6230': {
        name: 'Aïcha Ndiaye',
        email: 'aicha@gmail.com',
        address: 'Rufisque, Dakar',
        phone: '+221 78 456 7890'
      }
    };
    return customers[id as keyof typeof customers] || customers['B9K2'];
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'En traitement': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
      'Processing': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
      'En attente': { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
      'Pending': { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
      'Livrée': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
      'Delivered': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
      'Annulée': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
      'Cancelled': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
    };
    
    const style = statusStyles[status as keyof typeof statusStyles] || statusStyles['Processing'];
    
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
        <div className={`w-2 h-2 rounded-full ${style.dot}`}></div>
        {status}
      </div>
    );
  };

  const product = getProductData(orderId);
  const customer = getCustomerData(orderId);
  const shippingCost = parseInt(orderData.shippingCost.replace(/[^\d]/g, ''));
  const discount = 0;
  const totalAmount = product.total + shippingCost - discount;

  const handleDownloadPDF = () => {
    // Simulation téléchargement PDF
    console.log('Téléchargement PDF facture #' + orderId);
  };

  const handlePrintInvoice = () => {
    // Simulation impression
    window.print();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Invoice No #{orderId}</h2>
            <div className="mt-2">
              {getStatusBadge(orderData.status)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Section Produit */}
          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-15 h-15 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600">
                Qty: {product.qty} x {product.unitPrice.toLocaleString()} FCFA
              </p>
              <p className="font-bold text-gray-900">{product.total.toLocaleString()} FCFA</p>
            </div>
          </div>

          {/* Section Client */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Informations Client</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Nom:</span> {customer.name}</p>
              <p><span className="font-medium">Email:</span> {customer.email}</p>
              <p><span className="font-medium">Adresse:</span> {customer.address}</p>
              <p><span className="font-medium">Téléphone:</span> {customer.phone}</p>
            </div>
          </div>

          {/* Section Paiement */}
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-gray-600" />
            <div>
              <span className="font-medium text-gray-900">Payment Method: </span>
              <span className="text-gray-700">{orderData.method}</span>
            </div>
          </div>

          {/* Calculs Finaux */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping Cost</span>
              <span className="font-medium">{shippingCost.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium">{discount.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-red-600">{totalAmount.toLocaleString()} FCFA</span>
            </div>
          </div>

          {/* Boutons Action */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleDownloadPDF}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button
              onClick={handlePrintInvoice}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}