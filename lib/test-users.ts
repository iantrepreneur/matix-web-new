// Utilisateurs de test basés sur votre base de données Supabase
// IMPORTANT: Ces utilisateurs doivent être créés via l'interface d'inscription
// Vous ne pouvez pas vous connecter avec ces identifiants tant qu'ils n'existent pas dans Supabase Auth

export const testUsers = [
  {
    email: 'test.producteur@gmail.com',
    password: 'test123456',
    type: 'producer',
    name: 'Test Producteur',
    description: 'Producteur de volailles premium'
  },
  {
    email: 'test.distributeur@gmail.com', 
    password: 'test123456',
    type: 'distributor',
    name: 'Test Distribution',
    description: 'Distributeur spécialisé en produits avicoles'
  },
  {
    email: 'test.client@gmail.com',
    password: 'test123456',
    type: 'client', 
    name: 'Test Client',
    description: 'Client particulier'
  }
];

// 🚨 IMPORTANT: Comment créer ces utilisateurs de test
// 
// Les utilisateurs visibles dans votre base de données (table users) ne sont que des PROFILS.
// Pour vous connecter, vous devez créer les comptes dans Supabase Auth :
//
// 1. Attendez 10-15 minutes pour que le rate limit se réinitialise
// 2. Utilisez le modal d'inscription sur votre site
// 3. Créez des comptes avec ces nouveaux emails de test
// 4. Utilisez des emails différents de ceux que vous avez déjà testés
//
// Exemple d'emails à utiliser :
// - test.producteur.2024@gmail.com
// - test.distributeur.2024@gmail.com  
// - test.client.2024@gmail.com
//
// Mot de passe suggéré : Test123456!