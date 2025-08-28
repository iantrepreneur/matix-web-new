"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, User as UserIcon, Building, ShoppingCart } from 'lucide-react';
import { authService, User as UserType } from '@/lib/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [selectedProfile, setSelectedProfile] = useState<'producteur' | 'distributeur' | 'client' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    city: '',
    typeElevage: '',
    entreprise: '',
    ninea: '',
    zone: '',
    adresseLivraison: ''
  });
  const [error, setError] = useState('');

  const profiles = [
    {
      id: 'producteur' as const,
      icon: <ShoppingCart className="h-8 w-8" />,
      title: 'Producteur',
      subtitle: 'Je vends mes produits avicoles',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'distributeur' as const,
      icon: <Building className="h-8 w-8" />,
      title: 'Distributeur',
      subtitle: 'J\'achète en gros et revends',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'client' as const,
      icon: <UserIcon className="h-8 w-8" />,
      title: 'Client Final',
      subtitle: 'J\'achète pour ma consommation',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const user = authService.login(formData.email, formData.password);
    if (user) {
      onLogin(user);
      onClose();
      resetForm();
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!selectedProfile) {
      setError('Veuillez sélectionner un profil');
      return;
    }

    try {
      const userData: Partial<UserType> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        profile: selectedProfile
      };

      // Ajouter les champs spécifiques selon le profil
      if (selectedProfile === 'producteur') {
        userData.city = formData.city;
        userData.typeElevage = formData.typeElevage;
      } else if (selectedProfile === 'distributeur') {
        userData.entreprise = formData.entreprise;
        userData.ninea = formData.ninea;
        userData.zone = formData.zone;
      } else if (selectedProfile === 'client') {
        userData.adresseLivraison = formData.adresseLivraison;
      }

      const user = authService.register(userData);
      onLogin(user);
      onClose();
      resetForm();
    } catch (err) {
      setError('Erreur lors de l\'inscription');
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      name: '',
      phone: '',
      city: '',
      typeElevage: '',
      entreprise: '',
      ninea: '',
      zone: '',
      adresseLivraison: ''
    });
    setSelectedProfile(null);
    setError('');
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {activeTab === 'login' ? 'Se connecter' : 'S\'inscrire'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'login'
                ? 'border-b-2 border-matix-green-medium text-matix-green-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('login');
              resetForm();
            }}
          >
            Se connecter
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === 'register'
                ? 'border-b-2 border-matix-green-medium text-matix-green-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('register');
              resetForm();
            }}
          >
            S'inscrire
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {activeTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="votre@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                <p className="font-medium mb-2">Comptes de démonstration :</p>
                <p>• amadou@example.com (Producteur)</p>
                <p>• fatou@enterprises.sn (Distributeur)</p>
                <p>• ibrahima@gmail.com (Client)</p>
                <p className="mt-2 text-xs">Mot de passe : <code>123456</code></p>
              </div>

              <Button type="submit" className="w-full bg-matix-green-medium hover:bg-matix-green-dark text-white">
                Se connecter
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Sélection du profil */}
              {!selectedProfile ? (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Choisissez votre profil</h3>
                  <div className="space-y-3">
                    {profiles.map((profile) => (
                      <Card
                        key={profile.id}
                        className={`p-4 cursor-pointer transition-all ${profile.color}`}
                        onClick={() => setSelectedProfile(profile.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-gray-600">
                            {profile.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{profile.title}</h4>
                            <p className="text-sm text-gray-600">{profile.subtitle}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Inscription - {profiles.find(p => p.id === selectedProfile)?.title}
                    </h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProfile(null)}
                    >
                      Changer
                    </Button>
                  </div>

                  {/* Champs communs */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {selectedProfile === 'distributeur' ? 'Nom de l\'entreprise' : 'Nom complet'}
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+221 XX XXX XX XX"
                      required
                    />
                  </div>

                  {/* Champs spécifiques par profil */}
                  {selectedProfile === 'producteur' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville
                        </label>
                        <Input
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Type d'élevage
                        </label>
                        <Input
                          value={formData.typeElevage}
                          onChange={(e) => setFormData({...formData, typeElevage: e.target.value})}
                          placeholder="Ex: Poulets de chair, Pondeuses..."
                          required
                        />
                      </div>
                    </>
                  )}

                  {selectedProfile === 'distributeur' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          NINEA
                        </label>
                        <Input
                          value={formData.ninea}
                          onChange={(e) => setFormData({...formData, ninea: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zone de distribution
                        </label>
                        <Input
                          value={formData.zone}
                          onChange={(e) => setFormData({...formData, zone: e.target.value})}
                          placeholder="Ex: Dakar, Thiès, Kaolack..."
                          required
                        />
                      </div>
                    </>
                  )}

                  {selectedProfile === 'client' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse de livraison
                      </label>
                      <Input
                        value={formData.adresseLivraison}
                        onChange={(e) => setFormData({...formData, adresseLivraison: e.target.value})}
                        required
                      />
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-matix-green-medium hover:bg-matix-green-dark text-white">
                    S'inscrire
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}