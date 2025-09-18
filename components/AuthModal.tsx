"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, User as UserIcon, Building, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useSupabase';
import { userService } from '@/lib/services';
import { UserType } from '@/lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const { signUp, signIn } = useAuth();
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
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);
      if (error) {
        console.error('Erreur de connexion:', error);
        if (error.message.includes('Invalid login credentials') || error.message.includes('invalid_credentials')) {
          setError('❌ Email ou mot de passe incorrect. Vérifiez vos identifiants ou créez un compte d\'abord.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('📧 Veuillez confirmer votre email avant de vous connecter.');
        } else if (error.message.includes('Too many requests')) {
          setError('⏰ Trop de tentatives. Veuillez attendre quelques minutes.');
        } else {
          setError(`❌ Erreur de connexion: ${error.message}`);
        }
      } else if (data.user) {
        console.log('✅ Connexion réussie:', data.user);
        // Récupérer le profil utilisateur depuis la base de données
        const { data: profile } = await userService.getProfile(data.user.id);
        if (profile) {
          onLogin({ ...data.user, profile });
        } else {
          onLogin(data.user);
        }
        onClose();
        resetForm();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('❌ Une erreur est survenue lors de la connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
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

    try {
      console.log('🔄 Tentative d\'inscription avec:', { email: formData.email, profile: selectedProfile });
      
      // Créer le compte Supabase
      const { data, error } = await signUp(formData.email, formData.password, {
        name: formData.name,
        user_type: selectedProfile,
        business_name: selectedProfile === 'distributor' ? formData.entreprise : formData.name,
        phone: formData.phone
      });

      if (error) {
        console.error('Erreur d\'inscription:', error);
        if (error.message.includes('already registered')) {
          setError('📧 Cette adresse email est déjà utilisée. Essayez de vous connecter.');
        } else if (error.message.includes('Password should be at least')) {
          setError('🔒 Le mot de passe doit contenir au moins 6 caractères.');
        } else if (error.message.includes('Invalid email')) {
          setError('📧 Format d\'email invalide.');
        } else {
          setError(`❌ Erreur d\'inscription: ${error.message}`);
        }
        return;
      }

      if (data.user) {
        console.log('✅ Inscription réussie:', data.user);
        // Le profil est créé automatiquement par le trigger de la base de données
        // Récupérer le profil créé
        setTimeout(async () => {
          const { data: profile } = await userService.getProfile(data.user.id);
          if (profile) {
            onLogin({ ...data.user, profile });
          } else {
            onLogin(data.user);
          }
          
          // Forcer le rechargement pour s'assurer que l'état est correct
          setTimeout(() => {
            window.location.reload();
          }, 100);
          
        }, 1000); // Attendre que le trigger s'exécute
        onClose();
        resetForm();
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('❌ Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setLoading(false);
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
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre nom complet"
                />
              </div>
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
                    Adresse de livraison
                  </label>
                  <Input
                    type="text"
                    name="adresseLivraison"
                    value={formData.adresseLivraison}
                    onChange={handleInputChange}
                    placeholder="Votre adresse de livraison"
                  />
                </div>
              )}
            </>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Chargement...' : (activeTab === 'login' ? 'Se connecter' : 'S\'inscrire')}
          </Button>
        </form>

        {activeTab === 'login' && (
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setActiveTab('register')}
              className="text-sm"
            >
              Pas encore de compte ? S'inscrire
            </Button>
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