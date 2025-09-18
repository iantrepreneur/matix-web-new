"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, User as UserIcon, Building, ShoppingCart } from 'lucide-react';
import { authService } from '@/lib/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [selectedProfile, setSelectedProfile] = useState<'producer' | 'distributor' | 'client' | null>(null);
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
  const [loading, setLoading] = useState(false);

  const profiles = [
    {
      id: 'producer' as const,
      icon: <ShoppingCart className="h-8 w-8" />,
      title: 'Producteur',
      subtitle: 'Je vends mes produits avicoles',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'distributor' as const,
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = authService.login(formData.email, formData.password);
    if (user) {
      onLogin(user);
      onClose();
      resetForm();
    } else {
      setError('❌ Email ou mot de passe incorrect. Utilisez "123456" comme mot de passe pour les comptes de test.');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!selectedProfile) {
      setError('⚠️ Veuillez sélectionner un profil');
      setLoading(false);
      return;
    }

    const userData = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      profile: selectedProfile,
      ...(selectedProfile === 'producer' && { city: '', typeElevage: '' }),
      ...(selectedProfile === 'distributor' && { entreprise: formData.entreprise || formData.name, ninea: '', zone: '' }),
      ...(selectedProfile === 'client' && { adresseLivraison: '' })
    };

    const user = authService.register(userData);
    if (user) {
      onLogin(user);
      onClose();
      resetForm();
    } else {
      setError('❌ Erreur lors de l\'inscription. Veuillez réessayer.');
    }
    setLoading(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeTab === 'login' ? 'Connexion' : 'Inscription'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Onglets */}
        <div className="flex mb-6">
          <Button
            variant={activeTab === 'login' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('login')}
            className="flex-1"
          >
            Connexion
          </Button>
          <Button
            variant={activeTab === 'register' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('register')}
            className="flex-1"
          >
            Inscription
          </Button>
        </div>

        {activeTab === 'register' && !selectedProfile && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Choisissez votre profil</h3>
            <div className="space-y-3">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${profile.color}`}
                  onClick={() => setSelectedProfile(profile.id)}
                >
                  <div className="flex items-center space-x-3">
                    {profile.icon}
                    <div>
                      <h4 className="font-semibold">{profile.title}</h4>
                      <p className="text-sm text-gray-600">{profile.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={activeTab === 'login' ? handleLogin : handleRegister}>
          {activeTab === 'register' && (
            </>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Votre mot de passe"
            />
          </div>

          {activeTab === 'register' && selectedProfile && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Votre numéro de téléphone"
                />
              </div>

              {selectedProfile === 'producer' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ville
                    </label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Votre ville"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type d'élevage
                    </label>
                    <Input
                      type="text"
                      name="typeElevage"
                      value={formData.typeElevage}
                      onChange={handleInputChange}
                      placeholder="Poulets, œufs, etc."
                    />
                  </div>
                </>
              )}

              {selectedProfile === 'distributor' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom de l'entreprise
                    </label>
                    <Input
                      type="text"
                      name="entreprise"
                      value={formData.entreprise}
                      onChange={handleInputChange}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NINEA
                    </label>
                    <Input
                      type="text"
                      name="ninea"
                      value={formData.ninea}
                      onChange={handleInputChange}
                      placeholder="Numéro NINEA"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zone de livraison
                    </label>
                    <Input
                      type="text"
                      name="zone"
                      value={formData.zone}
                      onChange={handleInputChange}
                      placeholder="Zone de livraison"
                    />
                  </div>
                </>
              )}

              {selectedProfile === 'client' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedProfile === 'distributor' ? 'Nom de l\'entreprise' : 'Nom complet'}
                  </label>
                  <Input
                    type="text"
                    name={selectedProfile === 'distributor' ? 'entreprise' : 'name'}
                    value={selectedProfile === 'distributor' ? formData.entreprise : formData.name}
                    onChange={handleInputChange}
                    placeholder={selectedProfile === 'distributor' ? 'Nom de votre entreprise' : 'Votre nom complet'}
          </div>
        )}

        {activeTab === 'register' && (
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setActiveTab('login')}
              className="text-sm"
            >
              Déjà un compte ? Se connecter
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}