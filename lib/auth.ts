export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  profile: 'producteur' | 'distributeur' | 'client';
  // Champs spécifiques par profil
  city?: string;
  typeElevage?: string;
  entreprise?: string;
  ninea?: string;
  zone?: string;
  adresseLivraison?: string;
}

// Utilisateurs mockés
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Amadou Diallo',
    email: 'amadou@example.com',
    phone: '+221 77 123 4567',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    profile: 'producteur',
    city: 'Dakar',
    typeElevage: 'Poulets de chair'
  },
  {
    id: '2',
    name: 'Fatou Enterprises',
    email: 'fatou@enterprises.sn',
    phone: '+221 76 234 5678',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    profile: 'distributeur',
    entreprise: 'Fatou Enterprises SARL',
    ninea: '123456789',
    zone: 'Thiès'
  },
  {
    id: '3',
    name: 'Ibrahima Ba',
    email: 'ibrahima@gmail.com',
    phone: '+221 75 345 6789',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    profile: 'client',
    adresseLivraison: 'Pikine, Dakar'
  }
];

// Simulation d'authentification
let currentUser: User | null = null;

export const authService = {
  login: (email: string, password: string): User | null => {
    const user = mockUsers.find(u => u.email === email);
    if (user && password === '123456') { // Mot de passe simple pour la démo
      currentUser = user;
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }
    return null;
  },

  register: (userData: Partial<User>): User => {
    const newUser: User = {
      id: Date.now().toString(),
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      ...userData
    } as User;
    
    mockUsers.push(newUser);
    currentUser = newUser;
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
    return newUser;
  },

  logout: () => {
    currentUser = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  },

  getCurrentUser: (): User | null => {
    if (currentUser) return currentUser;
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        currentUser = JSON.parse(stored);
        return currentUser;
      }
    }
    return null;
  }
};