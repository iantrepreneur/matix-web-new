// Utilisateurs de test basés sur votre base de données Supabase
// Utilisez ces identifiants pour tester l'authentification

export const testUsers = [
  {
    email: 'producteur1@gmail.com',
    password: 'test123456',
    type: 'producer',
    name: 'Volaille Premium de Thiès',
    description: 'Producteur de volailles premium'
  },
  {
    email: 'producteur2@gmail.com', 
    password: 'test123456',
    type: 'producer',
    name: 'Élevage Traditionnel du Sénégal',
    description: 'Élevage traditionnel et bio'
  },
  {
    email: 'distributeur@gmail.com',
    password: 'test123456', 
    type: 'distributor',
    name: 'Djoloff_Distribution',
    description: 'Distributeur spécialisé en produits avicoles'
  },
  {
    email: 'client@gmail.com',
    password: 'test123456',
    type: 'client', 
    name: 'Client Test',
    description: 'Client particulier'
  },
  {
    email: 'ferme@gmail.com',
    password: 'test123456',
    type: 'producer',
    name: 'Ferme Avicole de Dakar', 
    description: 'Ferme moderne à Dakar'
  }
];

// Instructions pour créer ces utilisateurs de test :
// 1. Utilisez le modal d'inscription sur votre site
// 2. Créez des comptes avec ces emails et le mot de passe 'test123456'
// 3. Ou utilisez directement ces identifiants si les comptes existent déjà