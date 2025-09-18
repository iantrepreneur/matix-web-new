"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { X, User as UserIcon, Building, ShoppingCart, Mail, Phone, ArrowLeft, Check } from 'lucide-react';
import { authService, authValidation } from '@/lib/auth-config';
import { authBypassService, testUsers } from '@/lib/auth-bypass';
import { useAuth } from '@/hooks/useSupabase';

interface AuthModalCompleteProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export default function AuthModalComplete({ isOpen, onClose, onLogin }: AuthModalCompleteProps) {
  const [currentStep, setCurrentStep] = useState<'method' | 'login' | 'register' | 'otp' | 'success'>('method');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<'producer' | 'distributor' | 'client' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    name: '',
    businessName: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);

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

  const resetForm = () => {
    setFormData({
      email: '',
      phone: '',
      password: '',
      name: '',
      businessName: '',
      otp: ''
    });
    setSelectedProfile(null);
    setError('');
    setCurrentStep('method');
    setAuthMethod(null);
    setOtpSent(false);
  };

  // Mode test pour contourner le rate limit
  const handleTestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.data?.user) {
        console.log('✅ Connexion réussie:', result.data.user);
        onLogin(result.data.user);
        onClose();
        resetForm();
        
        // Forcer le rechargement pour s'assurer que l'état est correct
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        setError(result.error?.message || '❌ Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('❌ Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Étape 1 : Choisir la méthode d'authentification
  const handleMethodSelect = (method: 'email' | 'phone') => {
    setAuthMethod(method);
    setCurrentStep('login');
  };

  // Connexion avec email/mot de passe
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!authValidation.validateEmail(formData.email)) {
      setError('❌ Format d\'email invalide');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signIn(formData.email, formData.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('❌ Email ou mot de passe incorrect. Vérifiez vos identifiants ou créez un compte.');
        } else if (error.message.includes('Email not confirmed')) {
          setError('📧 Veuillez confirmer votre email avant de vous connecter.');
        } else if (error.message.includes('Too many requests') || error.message.includes('rate limit')) {
          setError('⏰ Trop de tentatives de connexion. Veuillez attendre 10-15 minutes avant de réessayer. Utilisez un email différent si nécessaire.');
        } else {
          setError(`❌ Erreur de connexion: ${error.message}`);
        }
      } else if (data.user) {
        onLogin(data.user);
        onClose();
        resetForm();
      }
    } catch (err) {
      setError('❌ Une erreur est survenue lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };

  // Connexion avec OTP par email
  const handleEmailOTPLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const { data, error } = await authService.signInWithOTP(formData.email);
      
      if (error) {
        setError(`❌ Erreur: ${error.message}`);
      } else {
        setOtpSent(true);
        setCurrentStep('otp');
      }
    } catch (err) {
      setError('❌ Erreur lors de l\'envoi de l\'OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Connexion avec OTP par téléphone
  const handlePhoneOTPLogin = async () => {
    setError('');
    setLoading(true);

    const formattedPhone = authValidation.formatPhone(formData.phone);
    
    if (!authValidation.validatePhone(formattedPhone)) {
      setError('❌ Format de téléphone invalide. Utilisez le format +221XXXXXXXXX');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await authService.signInWithPhoneOTP(formattedPhone);
      
      if (error) {
        setError(`❌ Erreur: ${error.message}`);
      } else {
        setOtpSent(true);
        setCurrentStep('otp');
      }
    } catch (err) {
      setError('❌ Erreur lors de l\'envoi de l\'OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Inscription avec email
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!selectedProfile) {
      setError('⚠️ Veuillez sélectionner un profil');
      setLoading(false);
      return;
    }

    const passwordValidation = authValidation.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError('🔒 ' + passwordValidation.errors.join(', '));
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp(formData.email, formData.password, {
        userType: selectedProfile,
        name: formData.name,
        businessName: formData.businessName || formData.name,
        phone: formData.phone
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setError('📧 Cette adresse email est déjà utilisée. Essayez de vous connecter.');
        } else if (error.message.includes('Invalid email')) {
          setError('📧 Format d\'email invalide.');
        } else if (error.message.includes('Too many requests') || error.message.includes('rate limit')) {
          setError('⏰ Trop de tentatives d\'inscription. Veuillez attendre 10-15 minutes ou utiliser un email différent.');
        } else {
          setError(`❌ Erreur d\'inscription: ${error.message}`);
        }
      } else {
        setCurrentStep('success');
      }
    } catch (err) {
      setError('❌ Une erreur est survenue lors de l\'inscription.');
    } finally {
      setLoading(false);
    }
  };

  // Vérification OTP
  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      
      if (authMethod === 'email') {
        result = await authService.verifyEmailOTP(formData.email, formData.otp);
      } else {
        const formattedPhone = authValidation.formatPhone(formData.phone);
        result = await authService.verifyOTP(formattedPhone, formData.otp);
      }

      if (result.error) {
        setError(`❌ Code OTP invalide: ${result.error.message}`);
      } else if (result.data.user) {
        onLogin(result.data.user);
        onClose();
        resetForm();
        
        // Forcer le rechargement pour s'assurer que l'état est correct
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (err) {
      setError('❌ Erreur lors de la vérification OTP.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            {currentStep !== 'method' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (currentStep === 'otp') {
                    setCurrentStep('login');
                  } else if (currentStep === 'login' || currentStep === 'register') {
                    setCurrentStep('method');
                  }
                }}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h2 className="text-2xl font-bold text-gray-900">
              {currentStep === 'method' && 'Authentification'}
              {currentStep === 'login' && 'Connexion'}
              {currentStep === 'register' && 'Inscription'}
              {currentStep === 'otp' && 'Vérification'}
              {currentStep === 'success' && 'Succès'}
            </h2>
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

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Étape 1: Choisir la méthode d'authentification */}
        {currentStep === 'method' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-6">Comment souhaitez-vous vous authentifier ?</h3>
            
            <Button
              onClick={() => handleMethodSelect('email')}
              className="w-full flex items-center gap-3 p-4 h-auto bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
              variant="outline"
            >
              <Mail className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Email + Mot de passe</div>
                <div className="text-sm opacity-75">Authentification classique avec confirmation email</div>
              </div>
            </Button>

            <Button
              onClick={() => handleMethodSelect('phone')}
              className="w-full flex items-center gap-3 p-4 h-auto bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
              variant="outline"
            >
              <Phone className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Téléphone + OTP</div>
                <div className="text-sm opacity-75">Code de vérification par SMS</div>
              </div>
            </Button>
          </div>
        )}

        {/* Étape 2: Connexion */}
        {currentStep === 'login' && (
          <div className="space-y-4">
            {/* Toggle Mode Test */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800">Mode Test (Rate Limit)</p>
                  <p className="text-xs text-yellow-600">Contourne les limites Supabase pour les tests</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTestMode(!isTestMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isTestMode ? 'bg-yellow-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isTestMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              {isTestMode && (
                <div className="mt-3 text-xs text-yellow-700">
                  <p className="font-medium mb-1">Comptes de test disponibles :</p>
                  {testUsers.map((user, index) => (
                    <p key={index}>• {user.email} (mot de passe: test123)</p>
                  ))}
                </div>
              )}
            </div>
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">
                Connexion par {authMethod === 'email' ? 'Email' : 'Téléphone'}
              </h3>
            </div>

            {authMethod === 'email' ? (
              <form onSubmit={isTestMode ? handleTestLogin : handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse email
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

                <div>
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

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Connexion...' : (isTestMode ? 'Connexion Test' : 'Se connecter')}
                </Button>

                {!isTestMode && (
                  <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleEmailOTPLogin}
                    className="text-sm"
                    disabled={loading || !formData.email}
                  >
                    Ou recevoir un code par email
                  </Button>
                  </div>
                )}
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de téléphone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+221 XX XXX XX XX"
                  />
                </div>

                <Button
                  onClick={handlePhoneOTPLogin}
                  className="w-full"
                  disabled={loading || !formData.phone}
                >
                  {loading ? 'Envoi...' : 'Recevoir le code SMS'}
                </Button>
              </div>
            )}

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setCurrentStep('register')}
                className="text-sm"
              >
                Pas de compte ? S'inscrire
              </Button>
            </div>
          </div>
        )}

        {/* Étape 3: Inscription */}
        {currentStep === 'register' && (
          <div className="space-y-4">
            {!selectedProfile ? (
              <>
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
              </>
            ) : (
              <form onSubmit={handleEmailRegister} className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-600">
                    Profil sélectionné : <span className="font-semibold">
                      {profiles.find(p => p.id === selectedProfile)?.title}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {selectedProfile === 'distributor' ? 'Nom de l\'entreprise' : 'Nom complet'}
                  </label>
                  <Input
                    type="text"
                    name={selectedProfile === 'distributor' ? 'businessName' : 'name'}
                    value={selectedProfile === 'distributor' ? formData.businessName : formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={selectedProfile === 'distributor' ? 'Nom de votre entreprise' : 'Votre nom complet'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse email
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+221 XX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Minimum 6 caractères"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Création du compte...' : 'Créer mon compte'}
                </Button>
              </form>
            )}

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setCurrentStep('login')}
                className="text-sm"
              >
                Déjà un compte ? Se connecter
              </Button>
            </div>
          </div>
        )}

        {/* Étape 4: Vérification OTP */}
        {currentStep === 'otp' && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Vérification</h3>
              <p className="text-sm text-gray-600">
                Un code de vérification a été envoyé à {authMethod === 'email' ? formData.email : formData.phone}
              </p>
            </div>

            <form onSubmit={handleOTPVerification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code de vérification
                </label>
                <Input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  required
                  placeholder="123456"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading || formData.otp.length !== 6}>
                {loading ? 'Vérification...' : 'Vérifier le code'}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => {
                  if (authMethod === 'email') {
                    handleEmailOTPLogin();
                  } else {
                    handlePhoneOTPLogin();
                  }
                }}
                className="text-sm"
                disabled={loading}
              >
                Renvoyer le code
              </Button>
            </div>
          </div>
        )}

        {/* Étape 5: Succès */}
        {currentStep === 'success' && (
          <div className="text-center space-y-4">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-600">Compte créé avec succès !</h3>
            <p className="text-sm text-gray-600">
              {authMethod === 'email' 
                ? 'Veuillez vérifier votre email et cliquer sur le lien de confirmation.'
                : 'Votre compte a été créé. Vous pouvez maintenant vous connecter.'
              }
            </p>
            <Button onClick={onClose} className="w-full">
              Fermer
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}