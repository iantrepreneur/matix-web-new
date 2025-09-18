// Configuration complète de l'authentification Supabase
import { supabase } from './supabase';
import { getBaseURL } from './get-local-ip';

export interface AuthConfig {
  emailConfirmation: boolean;
  phoneConfirmation: boolean;
  otpLength: number;
  otpExpiry: number;
}

export const authConfig: AuthConfig = {
  emailConfirmation: true,
  phoneConfirmation: true,
  otpLength: 6,
  otpExpiry: 300 // 5 minutes
};

// Service d'authentification complet
export const authService = {
  // Inscription avec confirmation email
  async signUpWithEmail(email: string, password: string, userData: any) {
    const baseURL = getBaseURL();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userData.userType,
          business_name: userData.businessName,
          phone: userData.phone,
          full_name: userData.name
        },
        emailRedirectTo: `${baseURL}/auth/callback`
      }
    });
    
    return { data, error };
  },

  // Inscription avec OTP par téléphone
  async signUpWithPhone(phone: string, userData: any) {
    const { data, error } = await supabase.auth.signUp({
      phone,
      password: 'temp-password', // Sera changé après vérification OTP
      options: {
        data: {
          user_type: userData.userType,
          business_name: userData.businessName,
          email: userData.email,
          full_name: userData.name
        }
      }
    });
    
    return { data, error };
  },

  // Vérification OTP pour téléphone
  async verifyOTP(phone: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });
    
    return { data, error };
  },

  // Vérification OTP pour email
  async verifyEmailOTP(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });
    
    return { data, error };
  },

  // Connexion avec email/mot de passe
  async signInWithPassword(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    return { data, error };
  },

  // Connexion avec OTP par email
  async signInWithOTP(email: string) {
    const baseURL = getBaseURL();
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseURL}/auth/callback`
      }
    });
    
    return { data, error };
  },

  // Connexion avec OTP par téléphone
  async signInWithPhoneOTP(phone: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone
    });
    
    return { data, error };
  },

  // Réinitialisation de mot de passe
  async resetPassword(email: string) {
    const baseURL = getBaseURL();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseURL}/auth/reset-password`
    });
    
    return { data, error };
  },

  // Déconnexion
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Obtenir la session actuelle
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  }
};

// Utilitaires pour la validation
export const authValidation = {
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePhone: (phone: string): boolean => {
    // Format sénégalais : +221 XX XXX XX XX
    const phoneRegex = /^\+221[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  formatPhone: (phone: string): string => {
    // Nettoyer et formater le numéro de téléphone
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('221')) {
      return '+' + cleaned;
    } else if (cleaned.startsWith('7') || cleaned.startsWith('3')) {
      return '+221' + cleaned;
    }
    return phone;
  },

  validatePassword: (password: string): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (password.length < 6) {
      errors.push('Le mot de passe doit contenir au moins 6 caractères');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins une majuscule');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Le mot de passe doit contenir au moins un chiffre');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};