// Système d'authentification de contournement pour les tests
// Permet de tester sans être limité par Supabase Rate Limits

export interface TestUser {
  id: string;
  email: string;
  password: string;
  user_type: 'producer' | 'distributor' | 'client';
  business_name: string;
  phone: string;
  avatar: string;
  is_verified: boolean;
}

// Utilisateurs de test correspondant à vos comptes Supabase
export const testUsers: TestUser[] = [
  {
    id: '4c903b38-5346-4d43-bc99-40691ae45145',
    email: 'producteur2@gmail.com',
    password: 'test123',
    user_type: 'producer',
    business_name: 'Volaille Premium de Thiès',
    phone: '+221 77 123 4567',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    is_verified: true
  },
  {
    id: '267060b0-13d5-4fa9-a414-dbc1e533f05b',
    email: 'producteur1@gmail.com',
    password: 'test123',
    user_type: 'producer',
    business_name: 'Élevage Traditionnel du Sénégal',
    phone: '+221 76 234 5678',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    is_verified: true
  },
  {
    id: 'c9fc3505-954d-4f96-b79e-bfbe87cf9992',
    email: 'client@gmail.com',
    password: 'test123',
    user_type: 'client',
    business_name: 'Client Test',
    phone: '+221 75 345 6789',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    is_verified: false
  },
  {
    id: '303f243a-9129-4e94-8a6f-f8e247f0d15e',
    email: 'iantrepreneur221@gmail.com',
    password: 'test123',
    user_type: 'distributor',
    business_name: 'Djoloff_Distribution',
    phone: '+221 78 456 7890',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    is_verified: true
  },
  {
    id: 'b9e68c20-60df-40d9-9a35-1df76838bc29',
    email: 'diahatematlick@gmail.com',
    password: 'test123',
    user_type: 'producer',
    business_name: 'Ferme Avicole de Dakar',
    phone: '+221 77 987 6543',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    is_verified: true
  }
];

// Service d'authentification de contournement pour les tests
export const authBypassService = {
  // Mode de test activé
  isTestMode: process.env.NODE_ENV === 'development',

  // Connexion de test (sans Supabase)
  testLogin: (email: string, password: string): TestUser | null => {
    const user = testUsers.find(u => u.email === email && u.password === password);
    if (user) {
      // Stocker dans localStorage pour persistance
      if (typeof window !== 'undefined') {
        localStorage.setItem('test_user', JSON.stringify(user));
        localStorage.setItem('auth_mode', 'test');
      }
      return user;
    }
    return null;
  },

  // Déconnexion de test
  testLogout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('test_user');
      localStorage.removeItem('auth_mode');
    }
  },

  // Obtenir l'utilisateur de test actuel
  getCurrentTestUser: (): TestUser | null => {
    if (typeof window !== 'undefined') {
      const authMode = localStorage.getItem('auth_mode');
      if (authMode === 'test') {
        const stored = localStorage.getItem('test_user');
        if (stored) {
          return JSON.parse(stored);
        }
      }
    }
    return null;
  },

  // Vérifier si on est en mode test
  isInTestMode: (): boolean => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_mode') === 'test';
    }
    return false;
  }
};
// Inscription de test (sans Supabase)
testRegister: (email: string, password: string, userData: any): TestUser | null => {
  // Vérifier si l'email existe déjà
  const existingUser = testUsers.find(u => u.email === email);
  if (existingUser) {
    return null; // Email déjà utilisé
  }

  // Créer un nouvel utilisateur de test
  const newUser: TestUser = {
    id: `test-${Date.now()}`,
    email,
    password,
    user_type: userData.userType || 'client',
    business_name: userData.businessName || userData.name || 'Test User',
    phone: userData.phone || '',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    is_verified: false
  };

  // Ajouter à la liste des utilisateurs de test
  testUsers.push(newUser);

  // Stocker dans localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('test_user', JSON.stringify(newUser));
    localStorage.setItem('auth_mode', 'test');
  }

  return newUser;
},
