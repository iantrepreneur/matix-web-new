"use client";

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-matix-footer-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold text-matix-yellow mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">À Propos Matix</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Presse & Médias</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Investisseurs</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold text-matix-yellow mb-6">Liens Utiles</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Devenir Producteur</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Rejoindre comme Vétérinaire</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Programme Partenaires</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Formation Avicole</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Blog & Actualités</a></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-xl font-bold text-matix-yellow mb-6">Mon Compte</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Mes Commandes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Liste de Souhaits</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Suivi de Livraison</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Retours & Échanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Paramètres du Compte</a></li>
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h3 className="text-xl font-bold text-matix-yellow mb-6">Centre d'Aide</h3>
            <ul className="space-y-3 mb-6">
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">FAQ Aviculture</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Guide de Commande</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Politique de Livraison</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Conditions d'Utilisation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-matix-yellow transition-colors">Politique de Confidentialité</a></li>
            </ul>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-matix-yellow" />
                <span className="text-sm text-gray-300">+221 33 123 45 67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-matix-yellow" />
                <span className="text-sm text-gray-300">support@matix.sn</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-matix-yellow" />
                <span className="text-sm text-gray-300">Dakar, Sénégal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Payment */}
        <div className="border-t border-matix-green-dark mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Suivez-nous:</span>
              <div className="flex gap-3">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-matix-yellow cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-matix-yellow cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-matix-yellow cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-matix-yellow cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-400">Modes de Paiement:</span>
              <div className="flex gap-3">
                <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-bold">Orange Money</div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-bold">Wave</div>
                <div className="bg-matix-green-light text-white px-3 py-1 rounded text-sm font-bold">Free Money</div>
                <div className="bg-gray-600 text-white px-3 py-1 rounded text-sm">Espèces</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 pt-6 border-t border-matix-green-dark">
            <p className="text-gray-400">
              © 2024 <span className="text-matix-yellow">Matix SA</span>. Tous droits réservés. | Première plateforme avicole digitale du Sénégal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}