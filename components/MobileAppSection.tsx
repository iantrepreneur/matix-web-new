"use client";

import { Button } from '@/components/ui/button';
import { Smartphone, Download } from 'lucide-react';

export default function MobileAppSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Recevez Vos Commandes Avicoles Via Notre App 
              <span className="text-green-600"> Matix</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Commande vocale en wolof, suivi GPS en temps réel, notifications push 
              pour vos livraisons et conseils d'élevage personnalisés.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700">Interface optimisée pour mobile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Download className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700">Commandes hors ligne disponibles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-700">Assistance vocale en wolof intégrée</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Google Play"
                  className="h-6"
                />
                Google Play
              </Button>
              <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="App Store"
                  className="h-6"
                />
                App Store
              </Button>
            </div>
          </div>

          <div className="lg:text-right">
            <div className="relative inline-block">
              <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 transform rotate-3">
                <div className="bg-white rounded-2xl p-6 transform -rotate-3 shadow-2xl">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Matix App</h3>
                    <p className="text-gray-600 mb-4">
                      Votre assistant avicole mobile
                    </p>
                    <div className="bg-green-100 rounded-lg p-3">
                      <p className="text-green-700 font-medium">🎤 "Fooré ma poulet bu baax!"</p>
                      <p className="text-sm text-gray-600 mt-1">Commande vocale en wolof</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}