"use client";

import { Button } from '@/components/ui/button';
import { Smartphone, Download } from 'lucide-react';

export default function MobileAppSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-matix-green-pale to-matix-yellow/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-matix-green-dark mb-6">
              Acheter et Vendez simplement avec notre assistant
              <span className="text-matix-yellow"> Matix</span>
            </h2>
            <p className="text-xl text-matix-green-medium mb-8">
              Commande vocale en wolof, suivi GPS en temps réel, notifications push 
              pour vos livraisons et conseils d'élevage personnalisés.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-matix-yellow/20 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-matix-green-dark" />
                </div>
                <span className="text-matix-green-dark">Interface optimisée pour mobile</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-matix-yellow/20 p-2 rounded-full">
                  <Download className="h-5 w-5 text-matix-green-dark" />
                </div>
                <span className="text-matix-green-dark">Commandes hors ligne disponibles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-matix-yellow/20 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-matix-green-dark" />
                </div>
                <span className="text-matix-green-dark">Assistance vocale en wolof intégrée</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-matix-green-dark hover:bg-matix-green-medium text-white flex items-center gap-2 transition-all">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Google Play"
                  className="h-6"
                />
                Google Play
              </Button>
              <Button className="bg-matix-green-dark hover:bg-matix-green-medium text-white flex items-center gap-2 transition-all">
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
              <div className="bg-gradient-to-br from-matix-green-light to-matix-green-medium rounded-3xl p-8 transform rotate-3">
                <div className="bg-white rounded-2xl p-6 transform -rotate-3 shadow-matix-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-xl font-bold text-matix-green-dark mb-2">Matix Assistant</h3>
                    <p className="text-matix-green-medium mb-4">
                      Votre assistant avicole mobile
                    </p>
                    <div className="bg-matix-yellow/20 rounded-lg p-3">
                      <p className="text-matix-green-dark font-medium">🎤 "Dama beug diaye samay guinar"</p>
                      <p className="text-sm text-matix-green-medium mt-1">Commande vocale en wolof</p>
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